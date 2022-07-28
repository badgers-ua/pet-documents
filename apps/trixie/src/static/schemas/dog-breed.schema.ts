import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DogBreedDocument = DogBreed & mongoose.Document;

@Schema()
export class DogBreed {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true,
  })
  name: string;
}

export const DogBreedSchema = SchemaFactory.createForClass(DogBreed);
