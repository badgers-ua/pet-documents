import { GENDER, IStaticResDto, SPECIES } from '@pdoc/types';
import i18next from 'i18next';
import { DropDownOption } from '../../types';
import { ReactComponent as CatSVG } from '../icons/cat.svg';
import { ReactComponent as DogSVG } from '../icons/dog.svg';

/**
 *
 * @param species {SPECIES}
 * @param size {number}
 */
export const getPetAvatarLogoBySpecies = (
  species: SPECIES,
  size = 48
): JSX.Element => {
  const dictionary = {
    [SPECIES.CAT]: (
      <CatSVG data-test-id="cat-icon" width={size} height={size} />
    ),
    [SPECIES.DOG]: (
      <DogSVG data-test-id="dog-icon" width={size} height={size} />
    ),
  };
  return dictionary[species];
};

/**
 *
 * @param gender {GENDER}
 */
export const getGenderLabel = (gender: GENDER) => {
  const dictionary = {
    [GENDER.MALE]: i18next.t('male'),
    [GENDER.FEMALE]: i18next.t('female'),
  };
  return dictionary[gender];
};

/**
 *
 * @param staticArr {IStaticResDto[]}
 */
export const mapStaticArrayToDropDownOptions = (staticArr: IStaticResDto[]) =>
  staticArr.map(
    ({ _id, name }) => ({ label: name, value: _id } as DropDownOption<string>)
  );

export const getImageTypeFromBase64 = (base64: string): string => {
  return (base64 as any).match(/:(.*?);/)[1];
};

export const dataURLtoFile = (dataurl: string): File => {
  let arr = dataurl.split(',') as any,
    mime = getImageTypeFromBase64(arr[0]),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `avatar.${mime}`, { type: mime });
};
