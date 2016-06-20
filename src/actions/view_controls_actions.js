import { SHOW_DAY_VIEW, SHOW_WEEK_VIEW, SHOW_MONTH_VIEW } from './actions_types';

export const showDayView = () => {
  return {
    type: SHOW_DAY_VIEW
  };
};

export const showWeekView = () => {
  return {
    type: SHOW_WEEK_VIEW
  };
};

export const showMonthView = () => {
  return {
    type: SHOW_MONTH_VIEW
  };
};
