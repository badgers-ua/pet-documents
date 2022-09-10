import { Module } from '@nestjs/common';
import { StaticResolver } from './static.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CatBreed, CatBreedSchema } from './schemas/cat-breed.schema';
import { StaticService } from './static.service';
import { DogBreed, DogBreedSchema } from './schemas/dog-breed.schema';
import { CatFact, CatFactSchema } from './schemas/cat-fact.schema';
import { DogFact, DogFactSchema } from './schemas/dog-facts.schema';
import { FirebaseAuthGuardModule } from '../shared/guards/firebase-auth/firebase-auth-guard.module';
import { PopulateStaticDbService } from './populate-static-db.service';

const catBreedModel = { name: CatBreed.name, schema: CatBreedSchema };
const dogBreedModel = { name: DogBreed.name, schema: DogBreedSchema };
const catFactModel = { name: CatFact.name, schema: CatFactSchema };
const dogFactModel = { name: DogFact.name, schema: DogFactSchema };

@Module({
  imports: [
    MongooseModule.forFeature([
      catBreedModel,
      dogBreedModel,
      catFactModel,
      dogFactModel
    ]),
    FirebaseAuthGuardModule
  ],
  providers: [StaticService, StaticResolver, PopulateStaticDbService]
})
export class StaticModule {}
