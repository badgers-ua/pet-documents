import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { useMemo } from 'react';
import { PatchPetReqDto } from '../../../types';
import {
  PATCH_PET_SCHEMA,
  PETS_SCHEMA_AND_UPCOMING_EVENTS_GQL,
  PET_SCHEMA
} from './schemas';

type UseUpdatePetGQLProps = {
  petId: string;
  onCompleted: () => void;
};

const useUpdatePetGQL = ({ petId, onCompleted }: UseUpdatePetGQLProps) => {
  const [updatePet, { loading: isUpdatePetLoading }] = useMutation(
    PATCH_PET_SCHEMA,
    {
      refetchQueries: [
        { query: PETS_SCHEMA_AND_UPCOMING_EVENTS_GQL },
        { query: PET_SCHEMA, variables: { id: petId } }
      ],
      onCompleted
    }
  );

  const loadUpdatePet = useMemo(
    () => (patchPetReqDto: PatchPetReqDto, avatar: File | null) => {
      const body: any = { patchPetReqDto };
      if (patchPetReqDto.isAvatarChanged) {
        body.avatar = avatar;
      }
      return updatePet({ variables: body });
    },
    [updatePet]
  );

  return {
    loadUpdatePet,
    isUpdatePetLoading
  };
};

export default useUpdatePetGQL;
