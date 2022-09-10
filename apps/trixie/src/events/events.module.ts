import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { Pet, PetSchema } from '../pets/schemas/pet.schema';
import { FirebaseAuthGuardModule } from '../shared/guards/firebase-auth/firebase-auth-guard.module';
import { EventsResolver } from './events.resolver';

const eventModel = { name: Event.name, schema: EventSchema };
const petModel = { name: Pet.name, schema: PetSchema };

@Module({
  imports: [
    MongooseModule.forFeature([eventModel, petModel]),
    FirebaseAuthGuardModule
  ],
  providers: [EventsService, EventsResolver]
})
export class EventsModule {}
