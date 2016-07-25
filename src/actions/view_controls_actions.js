import { SHOW_DAY_VIEW, SHOW_WEEK_VIEW,
         SHOW_MONTH_VIEW, UPDATE_VIEW } from './actions_types';

export const showDayView = () => ({
  type: SHOW_DAY_VIEW
});

export const showWeekView = () => ({
  type: SHOW_WEEK_VIEW
});

export const showMonthView = () => ({
  type: SHOW_MONTH_VIEW
});

export const updateView = view => ({
  type: UPDATE_VIEW,
  view
});
