import { IsMongoId } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteEventResDto {
  @IsMongoId()
  @Field(() => String)
  readonly _id: string;
}
