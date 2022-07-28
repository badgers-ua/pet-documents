import { IsEmail, IsMongoId, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { IOwnerEmailDto } from '@pdoc/types';

@InputType()
export class AddOwnerReqDto implements IOwnerEmailDto {
  @IsEmail()
  @Field()
  readonly ownerEmail: string;
  @IsMongoId()
  @IsString()
  @Field()
  readonly petId: string;
}
