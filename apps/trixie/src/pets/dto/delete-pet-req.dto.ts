import { IsMongoId } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeletePetReqDto {
  @IsMongoId()
  @Field(() => String)
  readonly _id: string;
}
