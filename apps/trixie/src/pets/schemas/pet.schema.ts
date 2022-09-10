import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GENDER, SPECIES } from '@pdoc/types';

export type PetDocument = Pet & mongoose.Document;

@Schema()
export class Pet {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  name: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.String]
  })
  owners: string[];

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Number,
    trim: true
  })
  species: SPECIES;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  breed?: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Number,
    trim: true
  })
  gender?: GENDER;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Date,
    trim: true
  })
  dateOfBirth?: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  colour?: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  notes?: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Number,
    trim: true
  })
  weight?: number;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  avatar?: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
