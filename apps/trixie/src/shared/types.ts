import { Field, ObjectType } from '@nestjs/graphql';
import { IOwner } from '@pdoc/types';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@ObjectType()
export class Owner implements IOwner {
  @Field()
  _id: string;
  @Field()
  email?: string;
  @Field()
  name?: string;
  @Field()
  avatar?: string;

  public static fromAuthUser({
    uid,
    displayName,
    photoURL,
    email
  }: UserRecord): Owner {
    return {
      _id: uid,
      name: displayName,
      avatar: photoURL,
      email
    };
  }
}
