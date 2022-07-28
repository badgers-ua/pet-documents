import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { environment } from './environments/environment';
import { EventsModule } from './events/events.module';
import { FireBaseModule } from './firebase.module';
import { PetsModule } from './pets/pets.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !environment.production,
      playground: !environment.production,
      autoSchemaFile: true,
      csrfPrevention: true,
    }),
    FireBaseModule.forRoot(),
    AuthModule,
    StaticModule,
    PetsModule,
    EventsModule,
  ],
})
export class AppModule {}
