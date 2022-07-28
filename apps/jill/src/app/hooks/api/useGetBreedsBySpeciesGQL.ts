import { useLazyQuery } from '@apollo/client/react/hooks/useLazyQuery';
import { GET_BREEDS_BY_SPECIES_SCHEMA } from './schemas';
import { useMemo } from 'react';
import { SPECIES } from '@pdoc/types';

const useGetBreedsBySpeciesGQL = () => {
  const [getBreedsBySpecies, { loading: isLoadingBreeds }] = useLazyQuery(
    GET_BREEDS_BY_SPECIES_SCHEMA,
  );

  const loadBreedsBySpecies = useMemo(
    () => (species: SPECIES) => getBreedsBySpecies({ variables: { species } }),
    [getBreedsBySpecies],
  );

  return {
    loadBreedsBySpecies,
    isLoadingBreeds,
  };
};

export default useGetBreedsBySpeciesGQL;
