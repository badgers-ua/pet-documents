import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CatFactDocument = CatFact & mongoose.Document;

@Schema()
export class CatFact {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true
  })
  name: string;
}

export const CatFactSchema = SchemaFactory.createForClass(CatFact);
