import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import calendarApp from '../reducers/calendar_app';
import defaultInitialState from './default_initial_state';

export default createStore(
  calendarApp,
  defaultInitialState,
  applyMiddleware(
    thunkMiddleware
  )
);
