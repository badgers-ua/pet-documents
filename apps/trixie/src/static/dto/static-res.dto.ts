import { Field, ObjectType } from '@nestjs/graphql';
import { IStaticResDto } from '@pdoc/types';

@ObjectType()
export class StaticResDto implements IStaticResDto {
  @Field()
  public _id: string;
  @Field()
  public name: string;

  constructor(_id: string, name: string) {
    this._id = _id;
    this.name = name;
  }
}
