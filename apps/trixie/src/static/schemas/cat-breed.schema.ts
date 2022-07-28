import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CatBreedDocument = CatBreed & mongoose.Document;

@Schema()
export class CatBreed {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true,
  })
  name: string;
}

export const CatBreedSchema = SchemaFactory.createForClass(CatBreed);
