import { gql } from '@apollo/client/core';

export const PET_FRAGMENT = gql`
  fragment Pet on PetResDto {
    _id
    name
    species
    gender
    dateOfBirth
    colour
    notes
    weight
    avatar
  }
`;

export const EVENT_FRAGMENT = gql`
  fragment Event on EventResDto {
    _id
    type
    petId
    petName
    date
    description
  }
`;
