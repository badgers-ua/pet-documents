import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { PET_SCHEMA } from './schemas';

const useGetPetByIdGQL = (petId: string) => {
  const {
    data,
    loading: isLoadingPet,
    error: petLoadingError,
  } = useQuery(PET_SCHEMA, {
    variables: { id: petId },
  });

  return { pet: data, isLoadingPet, petLoadingError };
};

export default useGetPetByIdGQL;
