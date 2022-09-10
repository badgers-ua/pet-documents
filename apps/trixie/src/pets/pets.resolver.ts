import { UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { auth } from 'firebase-admin';
import { FieldsByTypeName, parseResolveInfo } from 'graphql-parse-resolve-info';
import { MongoIdReqDto } from '../shared/dto/mongo-id-req.dto';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import { User } from '../utils/decorators';
import { AddOwnerReqDto } from './dto/add-owner-req.dto';
import { AddOwnerResDto } from './dto/add-owner-res.dto';
import { DeletePetReqDto } from './dto/delete-pet-req.dto';
import { DeletePetResDto } from './dto/delete-pet-res.dto';
import { PatchPetReqDto, PetReqDto } from './dto/pet-req.dto';
import {
  CreatedPetResDto,
  PatchedPetResDto,
  PetResDto
} from './dto/pet-res.dto';
import { RemoveOwnerReqDto } from './dto/remove-owner-req.dto';
import { RemoveOwnerResDto } from './dto/remove-owner-res.dto';
import { PetsService } from './pets.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');

@Resolver()
@UseGuards(FirebaseAuthGuard)
export class PetsResolver {
  constructor(private readonly petService: PetsService) {}

  @Query(() => [PetResDto], { name: 'getPets' })
  public getPets(
    @User() { uid }: auth.UserRecord,
    @Info() info
  ): Promise<PetResDto[]> {
    const parsedInfo: FieldsByTypeName = parseResolveInfo(
      info
    ) as FieldsByTypeName;

    const isBreedDetailsRequested = () => {
      const requestedBreedFields: FieldsByTypeName = (
        parsedInfo.fieldsByTypeName.PetResDto as any
      )?.breed.fieldsByTypeName.Breed;

      const requestedBreedKeys: string[] = Object.keys(requestedBreedFields);
      const isBreedDetailsRequested =
        requestedBreedKeys.includes('_id') && requestedBreedKeys.length > 1;
      return isBreedDetailsRequested;
    };

    const isOwnerDetailsRequested = () => {
      const requestedOwnerFields: FieldsByTypeName = (
        parsedInfo.fieldsByTypeName.PetResDto as any
      )?.owners.fieldsByTypeName.Owner;

      const requestedOwnerKeys: string[] = Object.keys(requestedOwnerFields);

      const isOwnerDetailsRequested: boolean =
        requestedOwnerKeys.includes('_id') && requestedOwnerKeys.length > 1;
      return isOwnerDetailsRequested;
    };

    return this.petService.getPetsByOwner(
      uid,
      isBreedDetailsRequested(),
      isOwnerDetailsRequested()
    );
  }

  @Query(() => PetResDto, { name: 'getPet', nullable: true })
  public getPet(
    @User() { uid }: auth.UserRecord,
    @Args('data') { _id }: MongoIdReqDto
  ): Promise<PetResDto> {
    return this.petService.getPetByIdAndOwner(_id, uid);
  }

  @Mutation(() => CreatedPetResDto, { name: 'createPet' })
  public createPet(
    @User() { uid }: auth.UserRecord,
    @Args('data') petReqDto: PetReqDto,
    @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true }) avatar
  ): Promise<CreatedPetResDto> {
    return this.petService.createPet(petReqDto, avatar, uid);
  }

  @Mutation(() => PatchedPetResDto, { name: 'patchPet' })
  public patchPet(
    @User() { uid }: auth.UserRecord,
    @Args('data') patchPetReqDto: PatchPetReqDto,
    @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true }) avatar
  ): Promise<PatchedPetResDto> {
    return this.petService.patchPet(
      patchPetReqDto._id,
      avatar,
      uid,
      patchPetReqDto
    );
  }

  @Mutation(() => AddOwnerResDto, { name: 'addOwner' })
  public addOwner(
    @User() { uid }: auth.UserRecord,
    @Args('data') ownerEmailReqDto: AddOwnerReqDto
  ): Promise<AddOwnerResDto> {
    return this.petService.addOwner(
      ownerEmailReqDto.petId,
      uid,
      ownerEmailReqDto
    );
  }

  @Mutation(() => RemoveOwnerResDto, { name: 'removeOwner' })
  public removeOwner(
    @User() { uid }: auth.UserRecord,
    @Args('data') removeOwnerReqDto: RemoveOwnerReqDto
  ): Promise<RemoveOwnerResDto> {
    return this.petService.removeOwner(
      removeOwnerReqDto.petId,
      uid,
      removeOwnerReqDto
    );
  }

  @Mutation(() => DeletePetResDto, { name: 'deletePet' })
  public deletePet(
    @User() { uid }: auth.UserRecord,
    @Args('data') { _id }: DeletePetReqDto
  ): Promise<DeletePetResDto> {
    return this.petService.deletePet(_id, uid);
  }
}
