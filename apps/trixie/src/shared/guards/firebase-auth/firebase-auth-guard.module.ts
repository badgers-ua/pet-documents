import { Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth-guard';

@Module({
  providers: [FirebaseAuthGuard],
  exports: [FirebaseAuthGuard]
})
export class FirebaseAuthGuardModule {}
