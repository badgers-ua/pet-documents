import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { IEventResDto, IPetResDto } from '@pdoc/types';
import { PET_PROFILE_GQL } from './schemas';

export type PetProfileGQLRes = {
  getPet: IPetResDto;
  getEventsByPet: IEventResDto[];
};

const useGetPetProfileGQL = (petId: string) => {
  const {
    data,
    loading: isLoading,
    error: petLoadingError,
  } = useQuery(PET_PROFILE_GQL, {
    variables: { petId },
  });

  return { data, isLoading, petLoadingError };
};

export default useGetPetProfileGQL;
