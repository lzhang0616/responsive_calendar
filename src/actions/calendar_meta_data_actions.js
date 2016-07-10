import { UPDATE_CALENDAR_META } from './actions_types';

export const updateDayViewEventLimit = eventLimit => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      dayViewEventLimit: eventLimit
    }
  };
};

export const updateWeekViewEventLimit = eventLimit => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      weekViewEventLimit: eventLimit
    }
  };
};

export const updateMonthViewEventLimit = eventLimit => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      monthViewEventLimit: eventLimit
    }
  };
};

export const updateDayViewEventLimitSize = size => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      dayViewEventLimitSize: size
    }
  };
};

export const updateWeekViewEventLimitSize = size => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      weekViewEventLimitSize: size
    }
  };
};

export const updateMonthViewEventLimitSize = size => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      monthViewEventLimitSize: size
    }
  };
};

export const updateEventLimitClick = target => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta: {
      eventLimitClick: target
    }
  };
};

export const updateCalendarMeta = calendarMeta => {
  return {
    type: UPDATE_CALENDAR_META,
    calendarMeta
  };
};
