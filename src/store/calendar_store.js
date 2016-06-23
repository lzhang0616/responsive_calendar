import thunkMiddleware from 'redux-thunk';
import calendarApp from '../reducers/calendar_app';
import defaultInitialState from './default_initial_state';
import { createStore, applyMiddleware } from 'redux';

export default createStore(
  calendarApp,
  defaultInitialState,
  applyMiddleware(
    thunkMiddleware
  )
);
