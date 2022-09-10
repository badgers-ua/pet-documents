import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  MaxLength,
  Max,
  IsMongoId
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  dateDtoTransformFormatter,
  numberedEnumValueLength
} from '../../utils/formatter.utils';
import { Field, InputType, Int } from '@nestjs/graphql';
import { GetEventsReqDto } from './get-events-req.dto';
import { EVENT } from '@pdoc/types';

@InputType()
export class CreateEventReqDto extends GetEventsReqDto {
  @Max(numberedEnumValueLength(EVENT))
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  type: EVENT;

  @IsDateString()
  @IsNotEmpty()
  @Transform(dateDtoTransformFormatter)
  @Field()
  date: string;

  @MaxLength(140)
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  // TODO: [Feature]: Push notifications
  // @IsBoolean()
  // isNotification: boolean;
}

@InputType()
export class PatchEventReqDto extends CreateEventReqDto {
  @IsMongoId()
  @IsString()
  @Field()
  _id: string;
}
