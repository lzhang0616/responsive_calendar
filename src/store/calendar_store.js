import thunkMiddleware from 'redux-thunk';
import calendarApp from '../reducers/calendar_app';
import defaultInitialState from './default_initial_state';
import { createStore, applyMiddleware } from 'redux';
import { fetchEventSources } from '../actions/events_actions';

const store = createStore(
  calendarApp,
  defaultInitialState,
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(fetchEventSources(true));

export default store;

