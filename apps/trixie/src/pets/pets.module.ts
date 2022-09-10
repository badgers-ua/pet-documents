import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsService } from './pets.service';
import { Pet, PetSchema } from './schemas/pet.schema';
import { Event } from '../events/schemas/event.schema';
import { CatBreed, CatBreedSchema } from '../static/schemas/cat-breed.schema';
import { DogBreed, DogBreedSchema } from '../static/schemas/dog-breed.schema';
import { UsersModule } from '../shared/users/users.module';
import { EventSchema } from '../events/schemas/event.schema';
import { PetsResolver } from './pets.resolver';
import { FirebaseAuthGuardModule } from '../shared/guards/firebase-auth/firebase-auth-guard.module';

const petModel = { name: Pet.name, schema: PetSchema };
const catBreedModel = { name: CatBreed.name, schema: CatBreedSchema };
const dogBreedModel = { name: DogBreed.name, schema: DogBreedSchema };
const eventModel = { name: Event.name, schema: EventSchema };

@Module({
  imports: [
    UsersModule,
    FirebaseAuthGuardModule,
    MongooseModule.forFeature([
      petModel,
      catBreedModel,
      dogBreedModel,
      eventModel
    ])
  ],
  providers: [PetsService, PetsResolver]
})
export class PetsModule {}
