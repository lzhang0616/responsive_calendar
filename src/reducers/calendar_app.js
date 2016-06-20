import moment from 'moment';
import monthViewInitialState from '../store/month_view_initial_state.js';
import { BACK_IN_DATE, BACK_TO_TODAY, FORWARD_IN_DATE,
         SHOW_DAY_VIEW, SHOW_WEEK_VIEW, SHOW_MONTH_VIEW, INIT_EVENTS } from '../actions/actions_types';

// TODO use combineReducers to split this root reducer into separate reducers

const calendarApp = (state = monthViewInitialState, action) => {
  const { type, view, events } = action;
  const { date } = state;

  let newState = state;

  switch(type) {
    case BACK_IN_DATE:
      const prevDate = date.add(-1, view);
      newState = Object.assign({}, state, { date: prevDate, selected: prevDate });
      break;
    case BACK_TO_TODAY:
      const today = moment().startOf('day');
      newState = Object.assign({}, state, { date: today, selected: today });
      break;
    case FORWARD_IN_DATE:
      const nextDate = date.add(1, view);
      newState = Object.assign({}, state, { date: nextDate, selected: nextDate });
      break;
    case SHOW_DAY_VIEW:
      newState = Object.assign({}, state, { view: 'day' });
      break;
    case SHOW_WEEK_VIEW:
      newState = Object.assign({}, state, { view: 'week' });
      break;
    case SHOW_MONTH_VIEW:
      newState = Object.assign({}, state, { view: 'month' });
      break;
    case INIT_EVENTS:
      newState = Object.assign({}, state, { events });
      break;
  }

  return newState;
};

export default calendarApp;
