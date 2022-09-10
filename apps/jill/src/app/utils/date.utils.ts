import i18next from 'i18next';
import { DateTime, DateTimeUnit } from 'luxon';

export const getUserDateFormat = (): string => {
  const userDate: string = Intl.DateTimeFormat(
    navigator.languages as string[]
  ).format(DateTime.now().set({ year: 1970, month: 12, day: 18 }).toJSDate());
  const userDateFormat: string = userDate
    .replace('18', 'dd')
    .replace('12', 'MM')
    .replace('1970', 'yyyy');
  return userDateFormat;
};

export const getAge = (birthDate: string): string => {
  if (!birthDate) {
    return '';
  }

  if (!DateTime.fromISO(birthDate).toISO()) {
    return '';
  }
  const date1 = DateTime.fromISO(birthDate).toUTC();
  const date2 = DateTime.now().toUTC();

  const {
    years = 0,
    months = 0,
    days = 0
  } = date2.diff(date1, ['years', 'months', 'days']).toObject();

  const roundedDays: number = Math.round(days);

  if (years === 0) {
    if (months === 0) {
      return `${i18next.t('age')}: ${roundedDays} ${i18next
        .t('days')
        .toLowerCase()}`;
    }

    return `${i18next.t('age')}: ${months} ${i18next.t('month').toLowerCase()}`;
  }

  if (months === 0) {
    return `${i18next.t('age')}: ${years} ${i18next.t('years').toLowerCase()}`;
  }

  return `${i18next.t('age')}: ${years} ${i18next
    .t('years')
    .toLowerCase()}, ${months} ${i18next.t('month').toLowerCase()}`;
};

export const getDateWithMidnightUTCTime = (isoDate: string): string => {
  const dateTimeMidnightLocal: DateTime = DateTime.fromISO(
    DateTime.fromISO(isoDate).toISODate()
  );
  const dateTimeMidnightUTC = DateTime.utc(
    dateTimeMidnightLocal.year,
    dateTimeMidnightLocal.month,
    dateTimeMidnightLocal.day,
    dateTimeMidnightLocal.hour,
    dateTimeMidnightLocal.minute,
    dateTimeMidnightLocal.second,
    dateTimeMidnightLocal.millisecond
  );
  return dateTimeMidnightUTC.toISO();
};

export const isToday = (isoDate: string) => {
  const hasSame = (_isoDate: string, dateTimeUnit: DateTimeUnit) => {
    return DateTime.fromISO(_isoDate).hasSame(DateTime.now(), dateTimeUnit);
  };

  const isDayToday: boolean = hasSame(isoDate, 'day');
  const isMonthToday: boolean = hasSame(isoDate, 'month');
  const isYearToday: boolean = hasSame(isoDate, 'year');

  return isDayToday && isMonthToday && isYearToday;
};

export const isPast = (isoDate: string): boolean => {
  if (isToday(isoDate)) {
    return false;
  }
  return DateTime.fromISO(isoDate).diffNow().milliseconds < 0;
};

export const isTodayOrFuture = (isoDate: string): boolean => {
  return (
    isToday(isoDate) || DateTime.fromISO(isoDate).diffNow().milliseconds > 0
  );
};
