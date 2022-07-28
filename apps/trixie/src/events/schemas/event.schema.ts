import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EVENT } from '@pdoc/types';
import * as mongoose from 'mongoose';

export type EventDocument = Event & mongoose.Document;
export type AggregatedEventDocument = EventDocument & { petName: string };

@Schema()
export class Event {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.Number,
    trim: true,
  })
  type: EVENT;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Date,
    trim: true,
  })
  date: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.String,
    trim: true,
  })
  description?: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
  })
  petId: mongoose.Types.ObjectId;

  // TODO: [Feature]: Push notifications
  // @Prop({
  //   required: true,
  //   type: mongoose.Schema.Types.Boolean,
  //   trim: true,
  // })
  // isNotification: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
