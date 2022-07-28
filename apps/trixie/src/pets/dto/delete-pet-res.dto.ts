import { IsMongoId } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletePetResDto {
  @IsMongoId()
  @Field()
  readonly _id: string;
}
