import { createStore } from 'redux';
import calendarApp from '../reducers/calendar_app';
import defaultInitialState from './default_initial_state';

export default createStore(calendarApp, defaultInitialState);
