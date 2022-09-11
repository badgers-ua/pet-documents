import { TransformFnParams } from 'class-transformer';
import { isNumber } from 'lodash';
import { DateTime } from 'luxon';

export const fromEntriesFormatter = (iterable: [string, any][]) => {
  if (!iterable?.length) {
    return;
  }
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

export const numberedEnumValueLength = (_enum): number => {
  return Object.values(_enum).filter((v: unknown) => isNumber(v)).length;
};

export const petHasOwnerMessageFormatter = (petName: string, owner: string) => {
  return `${owner} is already ${petName}'s owner`;
};

export const dateDtoTransformFormatter = ({ value }: TransformFnParams) => {
  return DateTime.fromISO(value).toUTC().toISO();
};

export const numberTransformFormatter = ({ value }: TransformFnParams) => {
  return isNumber(Number.parseFloat(value)) ? Number.parseFloat(value) : null;
};

export const booleanTransformFormatter = ({ value }: TransformFnParams) => {
  if (value?.toString() === 'true') {
    return true;
  }
  if (value?.toString() === 'false') {
    return false;
  }
};

export const removeFromArrayByIndexes = (arr: any[], indexesArr: number[]) => {
  const _arr = [...arr];
  for (let i = indexesArr.length - 1; i >= 0; i--) {
    _arr.splice(indexesArr[i], 1);
  }
  return _arr;
};
