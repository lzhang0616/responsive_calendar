import { today } from '../utilities/calendar_helpers';
import { calendarManagerInit } from '../store/default_initial_state';
import { BACK_IN_DATE, BACK_TO_TODAY, FORWARD_IN_DATE,
         SHOW_DAY_VIEW, SHOW_WEEK_VIEW,
         SHOW_MONTH_VIEW, UPDATE_VIEW, UPDATE_DATE } from '../actions/actions_types';

const calendarManager = (state = calendarManagerInit, action) => {
  const { type, newDate } = action;
  const { date, view } = state;

  let newState = state;

  switch (type) {
    case BACK_IN_DATE: {
      const prevDate = date.add(-1, view);
      newState = { ...state, date: prevDate, selected: prevDate };
      break;
    }
    case BACK_TO_TODAY: {
      const current = today();
      newState = { ...state, date: current, selected: current };
      break;
    }
    case FORWARD_IN_DATE: {
      const nextDate = date.add(1, view);
      newState = { ...state, date: nextDate, selected: nextDate };
      break;
    }
    case SHOW_DAY_VIEW:
      newState = { ...state, view: 'day' };
      break;
    case SHOW_WEEK_VIEW:
      newState = { ...state, view: 'week' };
      break;
    case SHOW_MONTH_VIEW:
      newState = { ...state, view: 'month' };
      break;
    case UPDATE_VIEW:
      newState = { ...state, view: action.view };
      break;
    case UPDATE_DATE:
      newState = { ...state, date: newDate };
      break;
    default:
      break;
  }

  return newState;
};

export default calendarManager;
