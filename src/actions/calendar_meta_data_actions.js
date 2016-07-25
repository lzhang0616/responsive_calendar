import { UPDATE_CALENDAR_META } from './actions_types';

export const updateDayViewEventLimit = eventLimit => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    dayViewEventLimit: eventLimit
  }
});

export const updateWeekViewEventLimit = eventLimit => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    weekViewEventLimit: eventLimit
  }
});

export const updateMonthViewEventLimit = eventLimit => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    monthViewEventLimit: eventLimit
  }
});

export const updateDayViewEventLimitSize = size => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    dayViewEventLimitSize: size
  }
});

export const updateWeekViewEventLimitSize = size => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    weekViewEventLimitSize: size
  }
});

export const updateMonthViewEventLimitSize = size => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    monthViewEventLimitSize: size
  }
});

export const updateEventLimitClick = target => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta: {
    eventLimitClick: target
  }
});

export const updateCalendarMeta = calendarMeta => ({
  type: UPDATE_CALENDAR_META,
  calendarMeta
});
