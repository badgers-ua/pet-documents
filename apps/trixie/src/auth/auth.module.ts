import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
