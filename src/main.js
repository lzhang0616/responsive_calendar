import React from 'react';
import ResponsiveCalendar from './index';
import thunkMiddleware from 'redux-thunk';
import calendarApp from './reducers/calendar_app';
import defaultInitialState from './store/default_initial_state';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { fetchEventSources } from './actions/events_actions';

const defaultOptions = {
  renderDivId: 'root'
};

export const calendar = (options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { renderDivId, dateFormatter, eventDateFormatter,
          startQueryParam, endQueryParam, defaultView, eventSources, eventGroupByKey } = mergedOptions;
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

  render(
    <ResponsiveCalendar store={store} options={{}} />,
    document.getElementById(renderDivId)
  );
};
