import { Inject, Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { FB_AUTH_PROVIDER_KEY } from '../../_constants';

@Injectable()
export class UsersService {
  constructor(@Inject(FB_AUTH_PROVIDER_KEY) private readonly auth: auth.Auth) {}

  public getUserByEmail(email: string): Promise<auth.UserRecord> {
    return this.auth.getUserByEmail(email);
  }

  public getUsers(
    identifiers: auth.UserIdentifier[],
  ): Promise<auth.GetUsersResult> {
    return this.auth.getUsers(identifiers);
  }

  public getAllUsers(): Promise<auth.ListUsersResult> {
    return this.auth.listUsers();
  }

  public getUserById(uid: string): Promise<auth.UserRecord> {
    return this.auth.getUser(uid);
  }
}
