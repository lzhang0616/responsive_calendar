import { today } from '../utilities/calendar_helpers';

const date = today();

export const calendarManagerInit = {
  selected: date,
  view: 'month',
  date
};

export const eventsManagerInit = {
  events: [],
  eventSources: []
};

export default {
  calendarManager: calendarManagerInit,
  eventsManager: eventsManagerInit
};

