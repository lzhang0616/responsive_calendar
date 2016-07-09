import { combineReducers } from 'redux';
import calendarManager from './calendar_manager';
import eventsManager from './events_manager';
import calendarMetaData from './calendar_meta_data';

const calendarApp = combineReducers({
  calendarManager,
  eventsManager,
  calendarMetaData
});

export default calendarApp;
