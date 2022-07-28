import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetEventsReqDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @Field()
  petId: string;
}
