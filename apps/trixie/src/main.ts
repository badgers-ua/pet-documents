/* eslint-disable @typescript-eslint/no-var-requires */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environments/environment';
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  if (environment.production) {
    const helmet = require('helmet');
    app.use(helmet());
  }

  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );

  const port: number = +environment.port;
  await app.listen(port);
}

bootstrap();
