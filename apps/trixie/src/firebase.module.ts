import { Bucket } from '@google-cloud/storage';
import { DynamicModule, Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/lib/credential';
import { environment } from './environments/environment';
import { FB_AUTH_PROVIDER_KEY, FB_BUCKET_PROVIDER_KEY } from './_constants';

@Global()
@Module({})
export class FireBaseModule {
  static forRoot(): DynamicModule {
    const serviceAccount: ServiceAccount =
      environment.fbServiceAccount as ServiceAccount;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: environment.fbBucketUrl
    });

    const bucket: Bucket = admin.storage().bucket();
    const auth: admin.auth.Auth = admin.auth();

    return {
      module: FireBaseModule,
      providers: [
        {
          provide: FB_BUCKET_PROVIDER_KEY,
          useValue: bucket
        },
        {
          provide: FB_AUTH_PROVIDER_KEY,
          useValue: auth
        }
      ],
      exports: [FB_BUCKET_PROVIDER_KEY, FB_AUTH_PROVIDER_KEY]
    };
  }
}
