import 'babel-polyfill';
import page from 'page';
import moment from 'moment';
import React, { Component } from 'react';
import CalendarContainer from './containers/calendar_container';
import thunkMiddleware from 'redux-thunk';
import calendarApp from './reducers/calendar_app';
import defaultInitialState from './store/default_initial_state';
import { flattenState } from './utilities/calendar_helpers';
import { updateView } from './actions/view_controls_actions';
import { updateDate } from './actions/calendar_controls_actions';
import { updateEventSources, updateEventsMeta } from './actions/events_actions';
import { createStore, applyMiddleware } from 'redux';
import { fetchEventSources } from './actions/events_actions';
import { Provider } from 'react-redux';

import './app.css';

const store = createStore(
  calendarApp,
  defaultInitialState,
  applyMiddleware(
    thunkMiddleware
  )
);

export default class ResponsiveCalendar extends Component {
  componentWillMount() {
    customizeState(this.props.options, store);
    setupHashRoutes(store);
  }

  componentDidUpdate() {
    customizeState(this.props.options, store);
  }

  render() {
    return (
      <Provider store={store}>
        <CalendarContainer store={store} />
      </Provider>
    );
  }
}

const customizeState = (options, store) => {
  const { renderDivId, dateFormatter, eventDateFormatter,
          startQueryParam, endQueryParam, defaultView, eventSources, eventGroupByKey } = options;
  const { dispatch } = store;
  const eventsMetaData = {};

  if (defaultView) {
    if (['day', 'week', 'month'].indexOf(defaultView) < 0) throw `view type: ${defaultView}`;

    dispatch(updateView(defaultView));
  }

  if (eventSources) {
    if (!Array.isArray(eventSources)) throw 'EventSources must be an array of source URLs';

    dispatch(updateEventSources(eventSources));
  }

  if (dateFormatter) eventsMetaData.dateFormatter = dateFormatter;
  if (eventDateFormatter) eventsMetaData.eventDateFormatter = eventDateFormatter;
  if (startQueryParam) eventsMetaData.startQueryParam = startQueryParam;
  if (endQueryParam) eventsMetaData.endQueryParam = endQueryParam;
  if (eventGroupByKey) eventsMetaData.eventGroupByKey = eventGroupByKey;

  dispatch(updateEventsMeta(eventsMetaData));

  dispatch(fetchEventSources(true));
};

const dispatchActions = (cxt, next) => {
  const { date, view } = cxt.params;
  const { dispatch, getState } = store;
  const newDate = moment(date, ['YYYY-MM-DD'], true);

  const flatState = flattenState(getState());
  const viewChanged = ( view !== flatState.view );
  const dateChanged = (newDate.isValid() && !newDate.isSame(flatState.date));

  if (['day', 'week', 'month'].indexOf(view) < 0) throw `view type: ${view}`;

  if (dateChanged) dispatch(updateDate(newDate));
  if (viewChanged) dispatch(updateView(view));

  if (dateChanged || viewChanged) dispatch(fetchEventSources());
};

const setupHashRoutes = store => {
  const { getState, subscribe } = store;

  page.base('/#');
  page('/:date/:view', dispatchActions);
  page();

  subscribe(() => {
    const { view, date } = flattenState(getState());

    page(`/${date.format('YYYY-MM-DD')}/${view}`);
  });
};
