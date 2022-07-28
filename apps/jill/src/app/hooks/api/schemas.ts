import { gql } from '@apollo/client/core';
import { EVENT_FRAGMENT, PET_FRAGMENT } from './fragments';

export const PETS_SCHEMA_AND_UPCOMING_EVENTS_GQL = gql`
  ${PET_FRAGMENT}
  ${EVENT_FRAGMENT}
  query petsAndUpcomingEvents {
    getPets {
      ...Pet
      owners {
        _id
      }
      breed {
        _id
      }
    }
    getUpcomingEvents {
      ...Event
    }
  }
`;

export const UPCOMING_EVENTS_SCHEMA = gql`
  ${EVENT_FRAGMENT}
  query getUpcomingEvents {
    getUpcomingEvents {
      ...Event
    }
  }
`;

export const PETS_SCHEMA = gql`
  ${PET_FRAGMENT}
  query getPets {
    getPets {
      ...Pet
      owners {
        _id
      }
      breed {
        _id
      }
    }
  }
`;

export const GET_BREEDS_BY_SPECIES_SCHEMA = gql`
  query getBreedsBySpecies($species: Int!) {
    getBreedsBySpecies(data: { species: $species }) {
      _id
      name
    }
  }
`;

export const CREATE_PET_SCHEMA = gql`
  mutation createPet($petReqDto: PetReqDto!, $avatar: Upload) {
    createPet(data: $petReqDto, avatar: $avatar) {
      _id
    }
  }
`;

export const PET_SCHEMA = gql`
  ${PET_FRAGMENT}
  query getPet($id: String!) {
    getPet(data: { _id: $id }) {
      ...Pet
      owners {
        _id
        name
        email
      }
      breed {
        _id
        name
      }
    }
  }
`;

export const PET_PROFILE_GQL = gql`
  ${PET_FRAGMENT}
  ${EVENT_FRAGMENT}
  query getPetProfile($petId: String!) {
    getPet(data: { _id: $petId }) {
      ...Pet
      owners {
        _id
        name
        email
      }
      breed {
        _id
        name
      }
    }
    getEventsByPet(data: { petId: $petId }) {
      ...Event
    }
  }
`;

export const EVENTS_SCHEMA = gql`
  ${EVENT_FRAGMENT}
  query getEventsByPet($petId: String!) {
    getEventsByPet(data: { petId: $petId }) {
      ...Event
    }
  }
`;

export const ADD_OWNER_SCHEMA = gql`
  mutation addOwner($addOwnerReqDto: AddOwnerReqDto!) {
    addOwner(data: $addOwnerReqDto) {
      _id
    }
  }
`;

export const REMOVE_OWNER_SCHEMA = gql`
  mutation removeOwner($removeOwnerReqDto: RemoveOwnerReqDto!) {
    removeOwner(data: $removeOwnerReqDto) {
      _id
    }
  }
`;

export const DELETE_PET_SCHEMA = gql`
  mutation deletePet($deletePetReqDto: DeletePetReqDto!) {
    deletePet(data: $deletePetReqDto) {
      _id
    }
  }
`;

export const DELETE_EVENT_SCHEMA = gql`
  mutation deleteEvent($deleteEventReqDto: DeleteEventReqDto!) {
    deleteEvent(data: $deleteEventReqDto) {
      _id
    }
  }
`;

export const PATCH_PET_SCHEMA = gql`
  mutation patchPet($patchPetReqDto: PatchPetReqDto!, $avatar: Upload) {
    patchPet(data: $patchPetReqDto, avatar: $avatar) {
      _id
    }
  }
`;

export const EVENT_SCHEMA = gql`
  ${EVENT_FRAGMENT}
  query getEvent($getEventReqDto: GetEventReqDto!) {
    getEvent(data: $getEventReqDto) {
      ...Event
    }
  }
`;

export const CREATE_EVENT_SCHEMA = gql`
  mutation createEvent($createEventReqDto: CreateEventReqDto!) {
    createEvent(data: $createEventReqDto) {
      _id
    }
  }
`;

export const UPDATE_EVENT_SCHEMA = gql`
  mutation patchEvent($patchEventReqDto: PatchEventReqDto!) {
    patchEvent(data: $patchEventReqDto) {
      _id
    }
  }
`;
