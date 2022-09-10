import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DogFactDocument = DogFact & mongoose.Document;

@Schema()
export class DogFact {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  name: string;
}

export const DogFactSchema = SchemaFactory.createForClass(DogFact);
