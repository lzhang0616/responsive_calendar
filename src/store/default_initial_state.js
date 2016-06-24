import { today } from '../utilities/calendar_helpers';

const date = today();
const cachedStart = date
        .clone()
        .add(-1, 'month')
        .startOf('month')
        .startOf('week');

const cachedEnd = date
        .clone()
        .add(1, 'month')
        .endOf('month')
        .add(1, 'week')
        .endOf('week');

export const calendarManagerInit = {
  selected: date,
  view: 'month',
  date
};

export const eventsManagerInit = {
  events: [],
  eventSources: [],
  startQueryParam: 'start',
  endQueryParam: 'end',
  dateFormatter: 'YYYY-MM-DD',
  eventDateFormatter: 'YYYY-MM-DD',
  cachedStart,
  cachedEnd
};

export default {
  calendarManager: calendarManagerInit,
  eventsManager: eventsManagerInit
};

