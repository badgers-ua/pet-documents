import { IsMongoId, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveOwnerReqDto {
  @IsString()
  @Field()
  readonly ownerId: string;

  @IsMongoId()
  @IsString()
  @Field()
  readonly petId: string;
}
