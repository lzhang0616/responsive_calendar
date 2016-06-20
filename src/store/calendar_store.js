import { createStore } from 'redux';
import calendarApp from '../reducers/calendar_app';
import monthViewInitialState from './month_view_initial_state.js';

export default createStore(calendarApp, monthViewInitialState);
