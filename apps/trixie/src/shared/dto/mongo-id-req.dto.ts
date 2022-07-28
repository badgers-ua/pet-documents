import { IsMongoId } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MongoIdReqDto {
  @IsMongoId()
  @Field(() => String)
  readonly _id: string;
}
