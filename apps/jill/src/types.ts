import { GENDER, SPECIES } from '@pdoc/types';

export type Children = {
  children: JSX.Element;
};

export interface DropDownOption<T> {
  label: string;
  value: T;
}

export interface Owner {
  _id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface PetReqDto {
  name: string;
  species: SPECIES;
  breed?: string | null;
  gender?: GENDER | null;
  dateOfBirth?: string | null;
  colour?: string | null;
  notes?: string | null;
  weight?: number | null;
  avatar?: any | null;
}

export interface CreateEventReqDto {
  type: number;
  date: string;
  petId: string;
  description?: string | null;
}

export interface PatchPetReqDto extends PetReqDto {
  _id: string;
  isAvatarChanged: boolean;
}

export interface PatchEventReqDto extends CreateEventReqDto {
  _id: string;
}

export interface GetEventReqDto {
  _id: string;
  petId: string;
}

export interface AddOwnerReqDto {
  ownerEmail: string;
  petId: string;
}

export interface RemoveOwnerReqDto {
  ownerId: string;
  petId: string;
}

export interface RemoveOwnerResDto {
  _id: string;
}

export interface DeletePetReqDto {
  _id: string;
}

export interface DeletePetResDto {
  _id: string;
}

export interface DeleteEventReqDto {
  _id: string;
}

export interface DeleteEventResDto {
  _id: string;
}

export interface AddEventToCalendarParams {
  petName: string;
  eventName: string;
  eventDate: string; // ISO
  eventDescription?: string;
}

export type isLoading = {
  isLoading: boolean;
};
