import { today } from '../utilities/calendar_helpers';

const date = today();

export const calendarManagerInit = {
  selected: date,
  view: 'month',
  date
};

export const eventsManagerInit = {
  events: [],
  eventSources: ['/calendar/events'],
  startQueryParam: 'start',
  endQueryParam: 'end',
  dateFormatter: 'YYYY-MM-DD'
};

export default {
  calendarManager: calendarManagerInit,
  eventsManager: eventsManagerInit
};

