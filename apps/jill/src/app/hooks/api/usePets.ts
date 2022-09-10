import { useLazyQuery } from '@apollo/client';
import { IPetResDto } from '@pdoc/types';
import sortBy from 'lodash/sortBy';
import { useEffect } from 'react';
import { isLoading } from '../../../types';
import { PETS_SCHEMA } from './schemas';

export type Pets = {
  pets: IPetResDto[];
} & isLoading;

interface PetsGQLRes {
  getPets: IPetResDto[];
}

const usePetsGQL = (): Pets => {
  const [fetch, { data, loading }] = useLazyQuery<PetsGQLRes>(PETS_SCHEMA);

  useEffect(() => {
    fetch();
  }, []);

  const { getPets: pets }: PetsGQLRes = data ?? {
    getPets: []
  };

  const sortedPets: IPetResDto[] = sortBy(pets, 'name') ?? [];

  return {
    pets: sortedPets,
    isLoading: loading
  };
};

export default usePetsGQL;
