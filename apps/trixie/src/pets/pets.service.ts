import { Bucket } from '@google-cloud/storage';
import { File } from '@google-cloud/storage/build/src/file';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { auth } from 'firebase-admin';
import { createWriteStream, unlinkSync } from 'fs';
import * as mongoose from 'mongoose';
import { Model, PipelineStage } from 'mongoose';
import { join } from 'path';
import { forkJoin, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { Event, EventDocument } from '../events/schemas/event.schema';
import { Owner } from '../shared/types';
import { UsersService } from '../shared/users/users.service';
import { CatBreed, CatBreedDocument } from '../static/schemas/cat-breed.schema';
import { DogBreed, DogBreedDocument } from '../static/schemas/dog-breed.schema';
import { petHasOwnerMessageFormatter } from '../utils/formatter.utils';
import { FB_BUCKET_PROVIDER_KEY } from '../_constants';
import { AddOwnerReqDto } from './dto/add-owner-req.dto';
import { AddOwnerResDto } from './dto/add-owner-res.dto';
import { DeletePetResDto } from './dto/delete-pet-res.dto';
import { PatchPetReqDto, PetReqDto } from './dto/pet-req.dto';
import {
  Breed,
  CreatedPetResDto,
  PatchedPetResDto,
  PetResDto,
} from './dto/pet-res.dto';
import { RemoveOwnerReqDto } from './dto/remove-owner-req.dto';
import { RemoveOwnerResDto } from './dto/remove-owner-res.dto';
import { Pet, PetDocument } from './schemas/pet.schema';
import {
  PET_CRUD_ERROR,
  PET_LAST_OWNER_ERROR,
  PET_LIMIT_REACHED,
  PET_LIMIT_REACHED_BY,
  USER_CRUD_ERROR,
} from './_constants';

type PetWithBreedDocument = PetDocument & { breed: Breed };

@Injectable()
export class PetsService {
  constructor(
    @Inject(FB_BUCKET_PROVIDER_KEY) private readonly _bucket: Bucket,
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(CatBreed.name)
    private readonly catBreedModel: Model<CatBreedDocument>,
    @InjectModel(DogBreed.name)
    private readonly dogBreedModel: Model<DogBreedDocument>,
    private readonly usersService: UsersService
  ) {}

  public async patchPet(
    petId: string,
    avatar,
    ownerId: string,
    petDto: PatchPetReqDto
  ): Promise<PatchedPetResDto> {
    console.log(petDto);
    const existingPet = await this.petModel
      .findById(new mongoose.Types.ObjectId(petId))
      .exec();

    if (!existingPet) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    if (!existingPet.owners.map((objId) => objId).includes(ownerId)) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    if (!!existingPet.avatar && petDto.isAvatarChanged) {
      const file: File = this._bucket.file(existingPet.avatar);
      try {
        await file.delete();
      } catch (e) {}
    }

    let newFileBucketPath: string | null = null;

    if (petDto.isAvatarChanged) {
      newFileBucketPath = await this.uploadAvatarToBucket(avatar);
    }

    const { _id } = await this.petModel
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(petId) },
        {
          ...petDto,
          avatar: petDto.isAvatarChanged ? newFileBucketPath : avatar,
        },
        {
          new: true,
        }
      )
      .exec();

    return new PatchedPetResDto(_id);
  }

  public async addOwner(
    petId: string,
    currentOwnerId: string,
    { ownerEmail }: AddOwnerReqDto
  ): Promise<AddOwnerResDto> {
    const pet: PetDocument = await this.petModel
      .findById(new mongoose.Types.ObjectId(petId))
      .exec();

    if (!pet) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    const requestedUser: auth.UserRecord =
      await this.usersService.getUserByEmail(ownerEmail);

    if (!requestedUser) {
      throw new BadRequestException(USER_CRUD_ERROR);
    }

    // TODO: [CLEANUP] Subscription feature
    const newOwnerCurrentPets: PetDocument[] = await this.petModel
      .find({ owners: { $in: [requestedUser.uid] } }, { __v: 0 })
      .exec();

    if (newOwnerCurrentPets?.length >= 2) {
      throw new NotAcceptableException(
        PET_LIMIT_REACHED_BY(requestedUser?.email)
      );
    }

    if (pet.owners.toString().includes(requestedUser.uid)) {
      throw new BadRequestException(
        petHasOwnerMessageFormatter(pet.name, ownerEmail)
      );
    }

    await this.petModel
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(pet._id) },
        { owners: [...pet.owners, requestedUser.uid] },
        {
          new: true,
        }
      )
      .exec();

    return { _id: requestedUser.uid };
  }

  public async removeOwner(
    petId: string,
    currentOwnerId: string,
    { ownerId }: RemoveOwnerReqDto
  ): Promise<RemoveOwnerResDto> {
    const pet: PetDocument = await this.petModel
      .findById(new mongoose.Types.ObjectId(petId))
      .exec();

    if (!pet) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    const requestedUser: auth.UserRecord = await this.usersService.getUserById(
      ownerId
    );

    if (!requestedUser) {
      throw new BadRequestException(USER_CRUD_ERROR);
    }

    if (!pet.owners.map((objId) => objId).includes(currentOwnerId)) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    if (
      (pet.owners || []).length === 1 &&
      pet.owners.map((objId) => objId).includes(currentOwnerId)
    ) {
      throw new BadRequestException(PET_LAST_OWNER_ERROR);
    }

    await this.petModel
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(pet._id) },
        {
          owners: pet.owners.filter((user_id) => user_id !== ownerId),
        },
        {
          new: true,
        }
      )
      .exec();

    return { _id: ownerId };
  }

  public async getPetByIdAndOwner(
    petId: string,
    ownerId: string
  ): Promise<PetResDto> {
    const [petDocument]: [PetWithBreedDocument] = (await this.petModel
      .aggregate(this.petAggregation(ownerId, petId))
      .exec()) as [PetWithBreedDocument];

    if (!petDocument) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    const { users }: auth.GetUsersResult = await this.usersService.getUsers(
      petDocument.owners.map((id) => ({ uid: id }))
    );

    if (!users?.length) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    const [petResDto]: [PetResDto] = (await this.petResDtosFromPetDocuments([
      petDocument,
    ])) as [PetResDto];

    return petResDto;
  }

  public async getPetsByOwner(
    ownerId: string,
    isBreedDetailsRequested: boolean,
    isOwnerDetailsRequested: boolean
  ): Promise<PetResDto[]> {
    const getPetResDtosWithBreedandOwners = async (): Promise<PetResDto[]> => {
      const petDocuments: PetWithBreedDocument[] = await this.petModel
        .aggregate(this.petAggregation(ownerId))
        .exec();

      const { users }: auth.ListUsersResult =
        await this.usersService.getAllUsers();

      if (!users?.length) {
        throw new BadRequestException(PET_CRUD_ERROR);
      }

      const petResDtos: PetResDto[] = await this.petResDtosFromPetDocuments(
        petDocuments
      );
      return petResDtos;
    };

    const getPetResDtoWithoutBreedAndOwners = async (): Promise<
      PetResDto[]
    > => {
      const petDocuments: PetDocument[] = await this.petModel
        .find({ owners: { $in: [ownerId] } }, { __v: 0 })
        .exec();

      const expires: number = new Date().setDate(new Date().getDate() + 7);
      const petResDtos: PetResDto[] = [];

      for (let i = 0; i < petDocuments.length; i++) {
        const {
          _id,
          name,
          species,
          owners,
          breed,
          gender,
          dateOfBirth,
          colour,
          notes,
          weight,
          avatar,
        } = petDocuments[i];
        petResDtos.push({
          _id,
          name,
          species,
          owners: owners.map((id: string) => ({ _id: id })),
          breed: breed ? { _id: breed } : undefined,
          gender,
          dateOfBirth,
          colour,
          notes,
          weight,
          avatar: avatar
            ? (
                await this._bucket
                  .file(avatar)
                  .getSignedUrl({ expires, action: 'read' })
              )[0]
            : avatar,
        });
      }

      return petResDtos;
    };

    return isBreedDetailsRequested || isOwnerDetailsRequested
      ? getPetResDtosWithBreedandOwners()
      : getPetResDtoWithoutBreedAndOwners();
  }

  public async createPet(
    petDto: PetReqDto,
    avatar,
    ownerId: string
  ): Promise<CreatedPetResDto> {
    // TODO: [CLEANUP] Subscription feature
    const petDocuments: PetDocument[] = await this.petModel
      .find({ owners: { $in: [ownerId] } }, { __v: 0 })
      .exec();

    if (petDocuments?.length >= 2) {
      throw new NotAcceptableException(PET_LIMIT_REACHED);
    }

    const avatarFileName: string = !!avatar
      ? await this.uploadAvatarToBucket(avatar)
      : null;

    const newPet: Pet = {
      owners: [ownerId],
      avatar: avatarFileName,
      ...petDto,
    };

    const { _id } = await new this.petModel(newPet).save();

    return new CreatedPetResDto(_id);
  }

  public async deletePet(
    petId: string,
    ownerId: string
  ): Promise<DeletePetResDto> | never {
    await from(
      this.petModel
        .findOne({
          $and: [
            { _id: new mongoose.Types.ObjectId(petId) },
            { owners: ownerId },
          ],
        })
        .exec()
    )
      .pipe(
        switchMap((petDocument: PetDocument) => {
          return forkJoin([
            of(petDocument.delete()),
            from(
              this.eventModel
                .deleteMany({
                  petId: petId,
                })
                .exec()
            ),
            !!petDocument.avatar
              ? from(this._bucket.file(petDocument.avatar).delete())
              : of(undefined),
          ]);
        }),
        map(() => undefined),
        catchError(() => {
          throw new BadRequestException(PET_CRUD_ERROR);
        })
      )
      .toPromise();

    return { _id: petId };
  }

  private async uploadAvatarToBucket(
    { createReadStream, mimetype }: any,
    id = uuid()
  ): Promise<string> {
    const stream = createReadStream();

    const fileName = `${id}.${mimetype.split('/')[1]}`;

    const filePath: string = await new Promise((resolve) => {
      const createdStream = stream.pipe(
        createWriteStream(join(__dirname, '/' + fileName))
      );
      setTimeout(() => {
        resolve(createdStream.path);
      });
    });

    const [{ name: bucketFilePath }] = await this._bucket.upload(filePath, {
      gzip: true,
      destination: `pet-photos/${fileName}`,
    });

    unlinkSync(filePath);

    return bucketFilePath;
  }

  private async petResDtosFromPetDocuments(
    petDocuments: PetWithBreedDocument[]
  ): Promise<PetResDto[]> {
    const { users }: auth.ListUsersResult =
      await this.usersService.getAllUsers();

    if (!users?.length) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    const owners: Owner[] = users.map(Owner.fromAuthUser);
    const expires: number = this.getAvatarExpireTime();

    const petResDtos: PetResDto[] = [];

    for (let i = 0; i < petDocuments.length; i++) {
      const petDocument = petDocuments[i];

      const petResDto: PetResDto = {
        ...petDocument,
        _id: petDocument._id,
        avatar: petDocument.avatar
          ? (
              await this._bucket
                .file(petDocument.avatar)
                .getSignedUrl({ expires, action: 'read' })
            )[0]
          : petDocument.avatar,
        owners: owners.filter(({ _id }) => petDocument.owners.includes(_id)),
      };

      petResDtos.push(petResDto);
    }

    return petResDtos;
  }
  private getAvatarExpireTime(): number {
    const expires: number = new Date().setDate(new Date().getDate() + 7);
    return expires;
  }

  private petAggregation(ownerId: string, petId?: string): PipelineStage[] {
    return [
      {
        $match: {
          ...(petId ? { _id: new mongoose.Types.ObjectId(petId) } : {}),
          owners: {
            $in: [ownerId],
          },
        },
      },
      {
        $addFields: {
          breed: {
            $toObjectId: '$breed',
          },
        },
      },
      {
        $lookup: {
          from: 'catbreeds',
          localField: 'breed',
          foreignField: '_id',
          as: 'catBreed',
        },
      },
      {
        $lookup: {
          from: 'dogbreeds',
          localField: 'breed',
          foreignField: '_id',
          as: 'dogBreed',
        },
      },
      {
        $unwind: {
          path: '$catBreed',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$dogBreed',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          breed: ['$catBreed', '$dogBreed'],
        },
      },
      {
        $project: {
          catBreed: 0,
          dogBreed: 0,
        },
      },
      {
        $addFields: {
          breed: {
            $filter: {
              input: '$breed',
              as: 'breed',
              cond: {
                $ne: ['$$breed', null],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: '$breed',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
  }
}
