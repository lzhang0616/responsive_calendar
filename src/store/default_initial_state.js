import { today, getCachedStart, getCachedEnd } from '../utilities/calendar_helpers';

const date = today();

export const calendarManagerInit = {
  selected: date,
  view: 'month',
  date
};

export const eventsManagerInit = {
  events: [],
  eventSources: [],
  eventsMetaData: {
    startQueryParam: 'start',
    endQueryParam: 'end',
    dateFormatter: 'YYYY-MM-DD',
    eventDateFormatter: 'YYYY-MM-DD',
    eventGroupByKey: 'date',
    cachedStart: getCachedStart(date),
    cachedEnd: getCachedEnd(date),
    eventDataTransform: events => events,
    dedupEvents: event => event.id
  }
};

export default {
  calendarManager: calendarManagerInit,
  eventsManager: eventsManagerInit
};
