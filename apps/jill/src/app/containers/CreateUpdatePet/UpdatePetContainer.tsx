import { GENDER, IPetResDto, SPECIES } from '@pdoc/types';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DropDownOption, PatchPetReqDto } from '../../../types';
import CenteredNoDataMessage from '../../components/CenteredNoDataMessage';
import useGetPetByIdGQL from '../../hooks/api/useGetPetByIdGQL';
import useUpdatePetGQL from '../../hooks/api/useUpdatePetGQL';
import useSetLoadingStatus from '../../hooks/useSetLoadingStatus';
import { getDateWithMidnightUTCTime } from '../../utils/date.utils';
import { getSpeciesLabel } from '../../utils/factory.utils';
import { getGenderLabel } from '../../utils/formatter.utils';
import CreateUpdatePetForm, { CRUPetFormValues } from './_CreateUpdatePetForm';

const UpdatePetContainer = () => {
  const { id: petId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { pet, isLoadingPet } = useGetPetByIdGQL(petId ?? '');
  const { loadUpdatePet, isUpdatePetLoading } = useUpdatePetGQL({
    petId: petId ?? '',
    onCompleted: () => {
      navigate('/home');
    },
  });

  const handleSubmit = ({
    name,
    species,
    breed,
    gender,
    dateOfBirth,
    weight,
    color,
    description,
    avatar,
  }: CRUPetFormValues) => {
    const patchPetReqDto: PatchPetReqDto = {
      _id: petId ?? '',
      name,
      species: +(species as any)?.value,
      breed: !!(breed as any)?.value ? (breed as any)?.value : null,
      gender: Number.isInteger(Number.parseFloat((gender as any)?.value))
        ? +(gender as any)?.value
        : null,
      dateOfBirth: !!dateOfBirth
        ? getDateWithMidnightUTCTime((dateOfBirth as any as DateTime)!.toISO())
        : null,
      weight: Number.isInteger(Number.parseFloat(weight)) ? +weight : null,
      colour: !!color ? color : null,
      notes: !!description ? description : null,
      isAvatarChanged: avatar instanceof File,
    };

    loadUpdatePet(patchPetReqDto, avatar);
  };

  useSetLoadingStatus({ isLoading: isUpdatePetLoading || isLoadingPet });

  if (!pet) {
    return <CenteredNoDataMessage />;
  }

  const {
    getPet: {
      name,
      species,
      breed,
      gender,
      dateOfBirth,
      weight,
      colour,
      notes,
      avatar,
    },
  }: { getPet: IPetResDto } = pet;

  const initialValues: CRUPetFormValues = {
    name,
    species: {
      label: getSpeciesLabel(species),
      value: species,
    } as DropDownOption<SPECIES>,
    breed: !!breed?._id
      ? ({ label: breed!.name, value: breed!._id } as DropDownOption<string>)
      : null,
    gender: Number.isInteger(gender)
      ? ({
          label: getGenderLabel(gender!),
          value: gender,
        } as DropDownOption<GENDER>)
      : null,
    dateOfBirth: !!dateOfBirth ? DateTime.fromISO(dateOfBirth) : null,
    weight: Number.isInteger(weight) ? weight!.toString() : '',
    color: colour ?? '',
    description: notes ?? '',
    avatar: null,
  };

  return (
    <CreateUpdatePetForm
      avatar={avatar}
      submitButtonText={t('update')}
      onSubmit={handleSubmit}
      disabled={isUpdatePetLoading}
      initialValues={initialValues}
    />
  );
};

export default UpdatePetContainer;
