import { EVENT, GENDER, IPetResDto, SPECIES } from '@pdoc/types';
import { FirebaseStorage, getDownloadURL, ref } from 'firebase/storage';
import i18next from 'i18next';
import { orderBy } from 'lodash';
import sortBy from 'lodash/sortBy';
import { DropDownOption } from '../../types';
import { getGenderLabel } from './formatter.utils';

export const getEnumIntegerValues = <T,>(_enum: object) =>
  Object.values(_enum).filter((value: string | number) =>
    Number.isInteger(value)
  ) as T[];

export const getSortedGenderOptions = (): DropDownOption<GENDER>[] =>
  sortBy(
    getEnumIntegerValues<GENDER>(GENDER).map(
      (value: GENDER) =>
        ({
          label: getGenderLabel(value),
          value
        } as DropDownOption<GENDER>)
    ),
    'label'
  );

export const getSpeciesLabel = (species: SPECIES) => {
  const dictionary = {
    [SPECIES.CAT]: i18next.t('cat'),
    [SPECIES.DOG]: i18next.t('dog')
  };
  return dictionary[species];
};

export const getSortedSpeciesOptions = (): DropDownOption<SPECIES>[] =>
  sortBy(
    getEnumIntegerValues<SPECIES>(SPECIES).map(
      (value: SPECIES) =>
        ({
          label: getSpeciesLabel(value),
          value
        } as DropDownOption<SPECIES>)
    ),
    'label'
  );

export const getEventLabel = (event: EVENT) => {
  const dictionary = {
    [EVENT.VACCINATION]: i18next.t('eventVaccination'),
    [EVENT.DEWORMING]: i18next.t('eventDeworming'),
    [EVENT.END_OF_TREATMENT]: i18next.t('eventEndOfTreatment'),
    [EVENT.OPERATION]: i18next.t('eventOperation'),
    [EVENT.CHILDBIRTH]: i18next.t('eventChildbirth'),
    [EVENT.STERILIZATION]: i18next.t('eventSterilization'),
    [EVENT.TICK_TREATMENT]: i18next.t('eventTickTreatment'),
    [EVENT.VACCINATION_AGAINST_RABIES]: i18next.t(
      'eventVaccinationAgainstRabies'
    ),
    [EVENT.VETERINARIAN_EXAMINATION]: i18next.t('eventVeterinarianExamination'),
    [EVENT.SHOW]: i18next.t('eventShow'),
    [EVENT.REWARD]: i18next.t('eventReward'),
    [EVENT.PHOTO_SESSION]: i18next.t('eventPhotoSession'),
    [EVENT.TRAINING]: i18next.t('eventTraining'),
    [EVENT.START_OF_TREATMENT]: i18next.t('eventStartOfTreatment'),
    [EVENT.PAIRING]: i18next.t('eventPairing'),
    [EVENT.ESTRUS]: i18next.t('eventEstrus'),
    [EVENT.MOLT]: i18next.t('eventMolt'),
    [EVENT.OTHER]: i18next.t('other'),
    [EVENT.GROOMING]: i18next.t('grooming')
  };
  return dictionary[event];
};

export const getEventOptions = (): DropDownOption<EVENT>[] => {
  const eventOptions: DropDownOption<EVENT>[] = getEnumIntegerValues<EVENT>(
    EVENT
  ).map(
    (value: EVENT) =>
      ({
        label: getEventLabel(value),
        value
      } as DropDownOption<EVENT>)
  );

  return orderBy(eventOptions, [({ label }) => label.toLowerCase()], ['asc']);
};

export const getHeaderHeight = (theme: any, isXs: boolean): number => {
  const [mobileHeaderHeight, , { minHeight: deskTopHeaderHeight }] =
    Object.values(theme.mixins.toolbar);
  return isXs ? mobileHeaderHeight : deskTopHeaderHeight;
};

export const getBucketDownloadUrl = async (
  storage: FirebaseStorage,
  url: string
) => {
  try {
    return await getDownloadURL(ref(storage, url));
  } catch (e) {
    console.error('Failed generate avatar url');
    return;
  }
};

export const getPetWithAvatar = async (
  storage: FirebaseStorage,
  pet: IPetResDto
) => {
  const petWithAvatar: IPetResDto = {
    ...pet,
    avatar: pet.avatar
      ? await getBucketDownloadUrl(storage, pet.avatar)
      : pet.avatar
  };
  return petWithAvatar;
};
