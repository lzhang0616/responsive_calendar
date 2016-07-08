import 'babel-polyfill';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import CalendarContainer from './containers/calendar_container';
import thunkMiddleware from 'redux-thunk';
import calendarApp from './reducers/calendar_app';
import defaultInitialState from './store/default_initial_state';
import { today, flattenState } from './utilities/calendar_helpers';
import { updateView } from './actions/view_controls_actions';
import { updateDate } from './actions/calendar_controls_actions';
import { updateEventSources, updateEventsMeta,
         addEventSources, removeEventSources, addDisabledEventTypes,
         removeDisabledEventTypes, updateDisabledEventTypes } from './actions/events_actions';
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
  componentWillMount = () => {
    this.setupConfigs();
  }

  componentDidUpdate = () => {
    this.setupConfigs();
  }

  setupConfigs = () => {
    const { dateAndViewUpdated, ...others } = this.props;

    customizeState(others, store);

    const subscriber = new updateSubscriber(store);
    subscriber.subscribe({ dateAndViewUpdated });
  }

  onClickEvent = (event, element) => {
    const { getState } = store;
    const { view } = flattenState(getState());

    const { onEventUpdated } = this.props;

    if (onEventUpdated) onEventUpdated(event, element, view);
  }

  render() {
    return (
      <Provider store={store}>
        <CalendarContainer onClickEvent={this.onClickEvent} />
      </Provider>
    );
  }
}

export const dispatchActions = (view, date) => {
  const { dispatch, getState } = store;

  let newDate = date === 'today' ? today() : date;
  newDate = moment(newDate, ['YYYY-MM-DD'], true);

  const flatState = flattenState(getState());
  const viewChanged = ( view !== flatState.view );
  const dateChanged = (newDate.isValid() && !newDate.isSame(flatState.date));

  if (['day', 'week', 'month'].indexOf(view) < 0) throw `view type: ${view}`;

  if (dateChanged) dispatch(updateDate(newDate));
  if (viewChanged) dispatch(updateView(view));

  if (dateChanged || viewChanged) dispatch(fetchEventSources());
};

export const addSources = sources => {
  const { dispatch } = store;
  dispatch(addEventSources(sources));
  dispatch(fetchEventSources());
};

export const removeSources = sources => {
  const { dispatch } = store;
  dispatch(removeEventSources(sources));
};

export const addHiddenEventTypes = eventTypes => {
  const { dispatch } = store;
  dispatch(addDisabledEventTypes(eventTypes));
};

export const removeHiddenEventTypes = eventTypes => {
  const { dispatch } = store;
  dispatch(removeDisabledEventTypes(eventTypes));
};

const customizeState = (options, store) => {
  const { renderDivId, dateFormatter, eventDateFormatter,
          startQueryParam, endQueryParam, defaultView, eventSources,
          eventGroupByKey, eventDataTransform, dedupEvents, disabledEventTypes } = options;
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

  if (disabledEventTypes) {
    if (!Array.isArray(disabledEventTypes)) throw 'disabledEventTypes must be an array';

    dispatch(updateDisabledEventTypes(disabledEventTypes));
  }

  if (dateFormatter) eventsMetaData.dateFormatter = dateFormatter;
  if (eventDateFormatter) eventsMetaData.eventDateFormatter = eventDateFormatter;
  if (startQueryParam) eventsMetaData.startQueryParam = startQueryParam;
  if (endQueryParam) eventsMetaData.endQueryParam = endQueryParam;
  if (eventGroupByKey) eventsMetaData.eventGroupByKey = eventGroupByKey;

  [ eventDataTransform, dedupEvents ].forEach(func => {
    if (func) {
      if (!_.isFunction(func)) throw `Expect a function, but get ${func}`;

      eventsMetaData[func.name] = func;
    }
  });

  dispatch(updateEventsMeta(eventsMetaData));

  dispatch(fetchEventSources(true));
};

class updateSubscriber {
  constructor(store) {
    this.store = store;
    this.prevDate = '';
    this.prevView = '';
  }

  subscribe = ({ dateAndViewUpdated }) => {
    const { getState, subscribe } = this.store;

    subscribe(() => {
      const { view, date } = flattenState(getState());
      const formattedDate = date.format('YYYY-MM-DD');

      if (formattedDate !== this.prevDate || view !== this.prevView) {
        if (dateAndViewUpdated) {
          if (!_.isFunction(dateAndViewUpdated)) throw 'dateAndViewUpdated must be a function';

          dateAndViewUpdated(formattedDate, view);
        }

        this.prevDate = formattedDate;
        this.prevView = view;
      }
    });
  };
}
