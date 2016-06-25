import 'babel-polyfill';
import React, { Component } from 'react';
import CalendarContainer from './containers/calendar_container';
import thunkMiddleware from 'redux-thunk';
import calendarApp from './reducers/calendar_app';
import defaultInitialState from './store/default_initial_state';
import { createStore, applyMiddleware } from 'redux';
import { fetchEventSources } from './actions/events_actions';
import { Provider } from 'react-redux';

import './app.css';

export default class ResponsiveCalendar extends Component {
  render() {
    const { options } = this.props;
    const customizedOptions = customizeInitState(options);
    const { store } = customizedOptions;

    return (
      <Provider store={store}>
        <CalendarContainer {...customizedOptions}/>
      </Provider>
    );
  }
}

const customizeInitState = options => {
  const { renderDivId, dateFormatter, eventDateFormatter,
          startQueryParam, endQueryParam, defaultView, eventSources, eventGroupByKey } = options;
  const { calendarManager, eventsManager } = defaultInitialState;

  if (defaultView) {
    if (['day', 'week', 'month'].indexOf(defaultView) < 0) throw `view type: ${defaultView}`;

    calendarManager.view = defaultView;
  }

  if (dateFormatter) eventsManager.dateFormatter = dateFormatter;
  if (eventDateFormatter) eventsManager.eventDateFormatter = eventDateFormatter;
  if (startQueryParam) eventsManager.startQueryParam = startQueryParam;
  if (endQueryParam) eventsManager.endQueryParam = endQueryParam;
  if (eventGroupByKey) eventsManager.eventGroupByKey = eventGroupByKey;

  if (eventSources) {
    if (!Array.isArray(eventSources)) throw 'EventSources must be an array of source URLs';

    eventsManager.eventSources = eventSources;
  }

  const store = createStore(
    calendarApp,
    { calendarManager, eventsManager },
    applyMiddleware(
      thunkMiddleware
    )
  );

  store.dispatch(fetchEventSources(true));

  return { store };
};
