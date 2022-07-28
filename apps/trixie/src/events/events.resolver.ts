import { UseGuards } from '@nestjs/common';
import { User } from '../utils/decorators';
import { EventsService } from './events.service';
import {
  CreatedEventResDto,
  EventResDto,
  PatchedEventResDto,
} from './dto/event-res.dto';
import {
  CreateEventReqDto,
  PatchEventReqDto,
} from './dto/create-event-req.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import { auth } from 'firebase-admin';
import { GetEventsReqDto } from './dto/get-events-req.dto';
import { GetEventReqDto } from './dto/get-event-req.dto';
import { DeleteEventReqDto } from './dto/delete-event-req.dto';
import { DeleteEventResDto } from './dto/delete-event-res.dto';

@Resolver()
@UseGuards(FirebaseAuthGuard)
export class EventsResolver {
  constructor(private readonly eventService: EventsService) {}

  @Query(() => [EventResDto], { name: 'getEventsByPet' })
  public getEventsByPet(
    @User() { uid }: auth.UserRecord,
    @Args('data') { petId }: GetEventsReqDto,
  ): Promise<EventResDto[]> {
    return this.eventService.getEventsByPet(uid, petId);
  }

  @Query(() => [EventResDto], { name: 'getUpcomingEvents' })
  public getUpcomingEvents(
    @User() { uid }: auth.UserRecord,
  ): Promise<EventResDto[]> {
    return this.eventService.getUpcomingEvents(uid);
  }

  @Query(() => EventResDto, { name: 'getEvent' })
  public getEventByPetAndId(
    @User() { uid }: auth.UserRecord,
    @Args('data') { petId, _id }: GetEventReqDto,
  ): Promise<EventResDto> {
    return this.eventService.getEvent(uid, petId, _id);
  }

  @Mutation(() => CreatedEventResDto, { name: 'createEvent' })
  public createEvent(
    @User() { uid }: auth.UserRecord,
    @Args('data') eventReqDto: CreateEventReqDto,
  ): Promise<CreatedEventResDto> {
    return this.eventService.create(eventReqDto, uid);
  }

  @Mutation(() => PatchedEventResDto, { name: 'patchEvent' })
  public patchEvent(
    @User() { uid }: auth.UserRecord,
    @Args('data') eventReqDto: PatchEventReqDto,
  ): Promise<PatchedEventResDto> {
    return this.eventService.update(eventReqDto._id, eventReqDto, uid);
  }

  @Mutation(() => DeleteEventResDto, { name: 'deleteEvent' })
  public deleteEvent(
    @User() { uid }: auth.UserRecord,
    @Args('data') { _id }: DeleteEventReqDto,
  ): Promise<DeleteEventResDto> {
    return this.eventService.delete(_id, uid);
  }
}
