import { Transform } from 'class-transformer';
import {
  numberedEnumValueLength,
  numberTransformFormatter,
} from '../../utils/formatter.utils';
import { IsNumber, Max } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { SPECIES } from '@pdoc/types';

@InputType()
export class StaticReqDto {
  @Transform(numberTransformFormatter)
  @Max(numberedEnumValueLength(SPECIES))
  @IsNumber()
  @Field(() => Int)
  species: SPECIES;
}
