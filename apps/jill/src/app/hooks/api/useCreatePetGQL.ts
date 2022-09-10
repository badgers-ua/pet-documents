import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { useMemo } from 'react';
import { PetReqDto } from '../../../types';
import { CREATE_PET_SCHEMA, PETS_SCHEMA } from './schemas';

type UseCreatePetGQLProps = {
  onCompleted: (data: any) => void;
};

const useCreatePetGQL = ({ onCompleted }: UseCreatePetGQLProps) => {
  const [createPet, { loading: isCreatePetLoading }] = useMutation(
    CREATE_PET_SCHEMA,
    {
      refetchQueries: [{ query: PETS_SCHEMA }],
      onCompleted
    }
  );

  const loadCreatePet = useMemo(
    () => (petReqDto: PetReqDto, avatar: File | null) => {
      const body: any = { petReqDto };
      if (!!avatar) {
        body.avatar = avatar;
      }
      return createPet({ variables: body });
    },
    [createPet]
  );

  return {
    loadCreatePet,
    isCreatePetLoading
  };
};

export default useCreatePetGQL;
