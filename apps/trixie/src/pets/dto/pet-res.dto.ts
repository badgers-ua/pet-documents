import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { GENDER, IBreed, IPetResDto, SPECIES } from '@pdoc/types';
import { Owner } from '../../shared/types';

@ObjectType()
export class Breed implements IBreed {
  @Field()
  _id: string;
  @Field()
  name?: string;
}

@ObjectType()
export class CreatedPetResDto {
  @Field()
  public _id: string;

  constructor(_id: string) {
    this._id = _id;
  }
}

@ObjectType()
export class PatchedPetResDto extends CreatedPetResDto {
  constructor(_id) {
    super(_id);
  }
}

@ObjectType()
class PetResponseBase {
  @Field()
  public _id: string;
  @Field()
  public name: string;
  @Field(() => Int)
  public species: SPECIES;
  @Field(() => Int, { nullable: true })
  public gender?: GENDER;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public dateOfBirth?: string;
  @Field({ nullable: true })
  public colour?: string;
  @Field({ nullable: true })
  public notes?: string;
  @Field({ nullable: true })
  public weight?: number;
  @Field({ nullable: true })
  public avatar?: string;

  constructor(
    _id: string,
    name: string,
    species: SPECIES,
    gender?: GENDER,
    dateOfBirth?: string,
    colour?: string,
    notes?: string,
    weight?: number,
    avatar?: string
  ) {
    this._id = _id;
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.colour = colour;
    this.notes = notes;
    this.weight = weight;
    this.avatar = avatar;
  }
}

@ObjectType()
export class PetResDto extends PetResponseBase implements IPetResDto {
  @Field(() => [Owner])
  public owners: Owner[];
  @Field(() => Breed, { nullable: true })
  public breed?: Breed;

  constructor(
    _id: string,
    name: string,
    species: SPECIES,
    owners: Owner[],
    breed?: Breed,
    gender?: GENDER,
    dateOfBirth?: string,
    colour?: string,
    notes?: string,
    weight?: number,
    avatar?: string
  ) {
    super(
      _id,
      name,
      species,
      gender,
      dateOfBirth,
      colour,
      notes,
      weight,
      avatar
    );
    this.owners = owners;
    this.breed = breed;
  }
}
