import {
  Field,
  Float,
  GraphQLISODateTime,
  InputType,
  Int,
} from '@nestjs/graphql';
import { GENDER, SPECIES } from '@pdoc/types';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import {
  booleanTransformFormatter,
  numberedEnumValueLength,
  numberTransformFormatter,
} from '../../utils/formatter.utils';

@InputType()
export class PetReqDto {
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly name: string;

  @Transform(numberTransformFormatter)
  @Max(numberedEnumValueLength(SPECIES))
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  readonly species: SPECIES;

  @IsMongoId()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly breed?: string;

  @Transform(numberTransformFormatter)
  @Max(numberedEnumValueLength(GENDER))
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly gender?: GENDER;

  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly dateOfBirth?: string;

  @MaxLength(20)
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly colour?: string;

  @MaxLength(140)
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly notes?: string;

  @Transform(numberTransformFormatter)
  @Max(100)
  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly weight?: number;
}

@InputType()
export class PatchPetReqDto extends PetReqDto {
  @IsMongoId()
  @IsString()
  @Field()
  readonly _id: string;

  @Transform(booleanTransformFormatter)
  @IsBoolean()
  @IsOptional()
  @Field()
  readonly isAvatarChanged?: boolean;
}
