import { GoogleCalendar, ICalendar } from 'datebook';
import CalendarOptions from 'datebook/src/types/CalendarOptions';
import { DateTime } from 'luxon';
import { AddEventToCalendarParams } from '../../types';
import { isPlatformApple } from './platfom.utils';

export const addEventToCalendar = (params: AddEventToCalendarParams) => {
  const { petName, eventName, eventDescription, eventDate } = params;
  const calendarTitle = `${petName}: ${eventName}`;

  const calendarOptions: CalendarOptions = {
    title: calendarTitle,
    description: eventDescription,
    start: DateTime.fromISO(eventDate).toJSDate()
  };

  const iCalendar = new ICalendar(calendarOptions);
  const gCalendar = new GoogleCalendar(calendarOptions);

  const addToCalendar = () => {
    if (isPlatformApple()) {
      iCalendar.download(`event.ics`);
      return;
    }

    window.open(gCalendar.render(), '_newtab');
  };

  return addToCalendar();
};
