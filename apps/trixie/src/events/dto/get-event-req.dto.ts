import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetEventReqDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @Field()
  _id: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @Field()
  petId: string;
}
