import { isNumber } from 'lodash';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PetReqDto } from '../../../types';
import useCreatePetGQL from '../../hooks/api/useCreatePetGQL';
import useSetLoadingStatus from '../../hooks/useSetLoadingStatus';
import { getDateWithMidnightUTCTime } from '../../utils/date.utils';
import CreateUpdatePetForm, { CRUPetFormValues } from './_CreateUpdatePetForm';

const initialFormValues: CRUPetFormValues = {
  name: '',
  species: null,
  breed: null,
  gender: null,
  dateOfBirth: null,
  weight: '',
  color: '',
  description: '',
  avatar: null
};

export const CreatePetContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { loadCreatePet, isCreatePetLoading } = useCreatePetGQL({
    onCompleted: ({ createPet: { _id } }) => {
      navigate(`/pet/${_id}`);
    }
  });

  useSetLoadingStatus({ isLoading: isCreatePetLoading });

  const handleSubmit = ({
    name,
    species,
    breed,
    gender,
    dateOfBirth,
    weight,
    color,
    description,
    avatar
  }: CRUPetFormValues) => {
    const petReqDto: PetReqDto = {
      name,
      species: +(species as any)?.value,
      breed: !!(breed as any)?.value ? (breed as any)?.value : null,
      gender: Number.isInteger(Number.parseFloat((gender as any)?.value))
        ? +(gender as any)?.value
        : null,
      dateOfBirth: !!dateOfBirth
        ? getDateWithMidnightUTCTime((dateOfBirth as any as DateTime)!.toISO())
        : null,
      weight: isNumber(Number.parseFloat(weight))
        ? Number.parseFloat(weight)
        : null,
      colour: !!color ? color : null,
      notes: !!description ? description : null
    };

    loadCreatePet(petReqDto, avatar);
  };

  return (
    <CreateUpdatePetForm
      submitButtonText={t('create')}
      onSubmit={handleSubmit}
      disabled={isCreatePetLoading}
      initialValues={initialFormValues}
    />
  );
};
