import { combineReducers } from 'redux';
import calendarManager from './calendar_manager';
import eventsManager from './events_manager';

const calendarApp = combineReducers({
  calendarManager,
  eventsManager
});

export default calendarApp;
