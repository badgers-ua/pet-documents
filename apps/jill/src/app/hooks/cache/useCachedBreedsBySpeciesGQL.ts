import { useApolloClient } from '@apollo/client/react/hooks/useApolloClient';
import { SPECIES } from '@pdoc/types';
import sortBy from 'lodash/sortBy';
import { DropDownOption } from '../../../types';
import { mapStaticArrayToDropDownOptions } from '../../utils/formatter.utils';
import { GET_BREEDS_BY_SPECIES_SCHEMA } from '../api/schemas';

const useCachedBreedsBySpeciesGQL = () => {
  const apolloClient = useApolloClient();

  const getCachedBreedOptions = (
    species?: SPECIES
  ): DropDownOption<string>[] => {
    if (!Number.isInteger(species)) {
      return [];
    }
    const cachedBreedsRes = apolloClient.readQuery({
      query: GET_BREEDS_BY_SPECIES_SCHEMA,
      variables: {
        species,
      },
    });

    return sortBy<DropDownOption<string>>(
      mapStaticArrayToDropDownOptions(
        cachedBreedsRes?.getBreedsBySpecies ?? []
      ),
      'label'
    );
  };

  return {
    loadCachedBreedsBySpecies: (species: SPECIES) =>
      getCachedBreedOptions(species),
  };
};

export default useCachedBreedsBySpeciesGQL;
