import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { AggregatedEventDocument } from '../schemas/event.schema';
import { EVENT, IEventResDto } from '@pdoc/types';

@ObjectType()
export class CreatedEventResDto {
  @Field()
  public _id: string;

  constructor(_id: string) {
    this._id = _id;
  }
}

@ObjectType()
export class PatchedEventResDto {
  @Field()
  public _id: string;

  constructor(_id: string) {
    this._id = _id;
  }
}

@ObjectType()
export class EventResDto implements IEventResDto {
  @Field()
  public _id: string;
  @Field(() => Int)
  public type: EVENT;
  @Field()
  public petId: string;
  @Field()
  public petName: string;
  @Field(() => GraphQLISODateTime)
  public date: string;
  @Field({ nullable: true })
  public description?: string;

  constructor(
    _id: string,
    petName: string,
    type: EVENT,
    petId: string,
    date: string,
    description?: string // TODO: [Feature]: Push notifications // public isNotification: boolean,
  ) {
    this._id = _id;
    this.petName = petName;
    this.type = type;
    this.petId = petId;
    this.date = date;
    this.description = description;
  }

  public static fromAggregatedEventDocument({
    _id,
    type,
    petId,
    petName,
    date,
    description
  }: // TODO: [Feature]: Push notifications // isNotification,
  AggregatedEventDocument): EventResDto {
    return new EventResDto(
      _id.toHexString(),
      petName,
      type,
      petId.toHexString(),
      date,
      description
      // TODO: [Feature]: Push notifications
      // isNotification,
    );
  }
}
