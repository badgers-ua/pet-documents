import {
  BadRequestException,
  Injectable,
  NotAcceptableException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from '../pets/schemas/pet.schema';
import { PET_CRUD_ERROR } from '../pets/_constants';
import { CreateEventReqDto } from './dto/create-event-req.dto';
import { DeleteEventResDto } from './dto/delete-event-res.dto';
import {
  CreatedEventResDto,
  EventResDto,
  PatchedEventResDto
} from './dto/event-res.dto';
import {
  AggregatedEventDocument,
  Event,
  EventDocument
} from './schemas/event.schema';
import { EVENT_CRUD_ERROR, EVENT_LIMIT_REACHED } from './_constants';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly _eventModel: Model<EventDocument>,
    @InjectModel(Pet.name) private readonly _petModel: Model<PetDocument>
  ) {}

  public async getEventsByPet(
    userId: string,
    petId: string
  ): Promise<EventResDto[]> {
    const aggregatedEventDocuments: AggregatedEventDocument[] =
      await this._petModel.aggregate([
        {
          $match: {
            $and: [
              { owners: { $in: [userId] } },
              { _id: new mongoose.Types.ObjectId(petId) }
            ]
          }
        },
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: 'petId',
            as: 'event'
          }
        },
        {
          $unwind: {
            path: '$event',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $project: {
            name: 1,
            event: 1,
            _id: 0
          }
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ petName: '$name' }, '$event'] }
          }
        }
      ]);

    return aggregatedEventDocuments.map((e) =>
      EventResDto.fromAggregatedEventDocument(e)
    );
  }

  public async getUpcomingEvents(userId: string): Promise<EventResDto[]> {
    const aggregatedEventDocuments: AggregatedEventDocument[] =
      await this._petModel.aggregate([
        {
          $match: {
            owners: { $in: [userId] }
          }
        },
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: 'petId',
            as: 'event'
          }
        },
        {
          $unwind: {
            path: '$event',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $match: {
            'event.date': {
              $gte: DateTime.fromISO(
                DateTime.now()
                  .set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  })
                  .toISO()
              ).toJSDate()
            }
          }
        },
        {
          $project: {
            name: 1,
            event: 1,
            _id: 0
          }
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ petName: '$name' }, '$event'] }
          }
        }
      ]);

    return aggregatedEventDocuments.map((e) =>
      EventResDto.fromAggregatedEventDocument(e)
    );
  }

  public async getEvent(
    userId: string,
    petId: string,
    eventId: string
  ): Promise<EventResDto> {
    const [aggregatedEventDocument]: AggregatedEventDocument[] =
      await this._petModel.aggregate([
        {
          $match: {
            $and: [
              { owners: { $in: [userId] } },
              { _id: new mongoose.Types.ObjectId(petId) }
            ]
          }
        },
        {
          $lookup: {
            from: 'events',
            let: {
              id: '$_id'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', new mongoose.Types.ObjectId(eventId)] },
                      {
                        $eq: ['$$id', '$petId']
                      }
                    ]
                  }
                }
              }
            ],
            as: 'event'
          }
        },
        {
          $unwind: {
            path: '$event',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $project: {
            name: 1,
            event: 1,
            _id: 0
          }
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ petName: '$name' }, '$event'] }
          }
        }
      ]);

    if (!aggregatedEventDocument) {
      throw new BadRequestException(EVENT_CRUD_ERROR);
    }

    return EventResDto.fromAggregatedEventDocument(aggregatedEventDocument);
  }

  public async create(
    eventDto: CreateEventReqDto,
    userId: string
  ): Promise<CreatedEventResDto> {
    // TODO: [Feature] Push notifications, logic if dto class validator ??
    // if (eventDto.isNotification) {
    //   const isPastDateSelected: boolean = this._isPastDateSelected(
    //     DateTime.fromISO(eventDto.date),
    //   );
    //   if (isPastDateSelected) {
    //     throw new BadRequestException(EVENT_PAST_DATE_ERROR);
    //   }
    // }

    // TODO: [CLEANUP] Subscription feature
    const currentEvents: EventResDto[] = await this.getEventsByPet(
      userId,
      eventDto.petId
    );
    if (currentEvents?.length >= 50) {
      throw new NotAcceptableException(EVENT_LIMIT_REACHED);
    }

    const pet = await this._petModel
      .findOne({
        $and: [
          { _id: new mongoose.Types.ObjectId(eventDto.petId) },
          { owners: userId }
        ]
      })
      .exec();

    if (!pet) {
      throw new BadRequestException(PET_CRUD_ERROR);
    }

    const createdEvent: EventDocument = await new this._eventModel({
      ...eventDto
    }).save();

    return new CreatedEventResDto(createdEvent._id);
  }

  public async update(
    _id: string,
    eventDto: CreateEventReqDto,
    userId: string
  ): Promise<PatchedEventResDto> {
    // TODO: [Feature] Push notifications, logic if dto class validator ??
    // if (eventDto.isNotification) {
    //   const isPastDateSelected: boolean = this._isPastDateSelected(
    //     DateTime.fromISO(eventDto.date),
    //   );
    //   if (isPastDateSelected) {
    //     throw new BadRequestException(EVENT_PAST_DATE_ERROR);
    //   }
    // }

    const eventId = new mongoose.Types.ObjectId(_id);

    const isUserOwnsEvent: boolean = await this._isUserOwnsEvent(
      eventId,
      userId
    );

    if (!isUserOwnsEvent) {
      throw new BadRequestException(EVENT_CRUD_ERROR);
    }

    const createdEvent: EventDocument = await this._eventModel
      .findOneAndUpdate({ _id: eventId }, eventDto, {
        new: true
      })
      .exec();

    return new PatchedEventResDto(createdEvent._id);
  }

  public async delete(_id, userId: string): Promise<DeleteEventResDto> {
    const eventId = new mongoose.Types.ObjectId(_id);

    const isUserOwnsEvent: boolean = await this._isUserOwnsEvent(
      eventId,
      userId
    );

    if (!isUserOwnsEvent) {
      throw new BadRequestException(EVENT_CRUD_ERROR);
    }

    const deletedEvent: EventDocument = await this._eventModel
      .findOneAndDelete({
        $and: [{ _id: eventId }]
      })
      .exec();

    if (!deletedEvent) {
      throw new BadRequestException(EVENT_CRUD_ERROR);
    }

    return { _id: deletedEvent._id };
  }

  private async _isUserOwnsEvent(
    eventId: mongoose.Types.ObjectId,
    userId: string
  ): Promise<boolean> {
    try {
      const aggregatedEvent = (
        await this._eventModel
          .aggregate([
            {
              $match: {
                _id: eventId
              }
            },
            {
              $lookup: {
                from: 'pets',
                localField: 'petId',
                foreignField: '_id',
                as: 'pet'
              }
            },
            {
              $unwind: {
                path: '$pet',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $match: {
                'pet.owners': {
                  $in: [userId]
                }
              }
            }
          ])
          .exec()
      )[0];
      return !!aggregatedEvent;
    } catch (e) {
      return false;
    }
  }

  // TODO: Notifications
  /*private _isPastDateSelected(date: DateTime): boolean {
    const isPastDateSelected: boolean = date.diffNow().milliseconds < 0;
    return isPastDateSelected;
  }*/
}
