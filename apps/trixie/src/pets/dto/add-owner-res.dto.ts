import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddOwnerResDto {
  @IsString()
  @Field()
  readonly _id: string;
}
