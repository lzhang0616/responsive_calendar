import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { INIT_EVENTS, UPDATE_EVENTS, UPDATE_EVENT_SOURCES,
         UPDATE_EVENTS_META, ADD_EVENT_SOURCES, REMOVE_EVENT_SOURCES,
         UPDATE_DISABLED_EVENT_TYPES, ADD_DISABLED_EVENT_TYPES, REMOVE_DISABLED_EVENT_TYPES } from './actions_types';
import { getRange, flattenState, getCachedStart,
         getCachedEnd, windowSize, windowSizeUnit } from '../utilities/calendar_helpers';

let prevEventSources;

const fetchInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  credentials: 'same-origin'
};

export const addDisabledEventTypes = eventTypes => {
  return {
    type: ADD_DISABLED_EVENT_TYPES,
    eventTypes
  };
};

export const removeDisabledEventTypes = eventTypes => {
  return {
    type: REMOVE_DISABLED_EVENT_TYPES,
    eventTypes
  };
};

export const updateDisabledEventTypes = eventTypes => {
  return {
    type: UPDATE_DISABLED_EVENT_TYPES,
    eventTypes
  };
};

export const addEventSources = eventSources => {
  return {
    type: ADD_EVENT_SOURCES,
    eventSources
  };
};

export const removeEventSources = eventSources => {
  return {
    type: REMOVE_EVENT_SOURCES,
    eventSources
  };
};

export const updateEventSources = eventSources => {
  return {
    type: UPDATE_EVENT_SOURCES,
    eventSources
  };
};

export const updateEventsMeta = metaShouldUpdate => {
  return {
    type: UPDATE_EVENTS_META,
    metaShouldUpdate
  };
};

const updateEvents = (init, payload) => {
  let type;
  if (init) {
    type = INIT_EVENTS;
  } else {
    type = UPDATE_EVENTS;
  }

  return { ...payload, type };
};

const getNewWindowStart = start => {
  return start.clone()
    .add(-1 * windowSize, windowSizeUnit)
    .startOf(windowSizeUnit)
    .startOf('week');
};

const getNewWindowEnd = end => {
  return end.clone()
    .add(windowSize, windowSizeUnit)
    .endOf(windowSizeUnit)
    .add(1, 'week')
    .endOf('week');
};

const shouldInit = (start, end, cachedStart, cachedEnd, date) => {
  const newStart = getNewWindowStart(cachedStart);
  const newEnd = getNewWindowEnd(cachedEnd);

  if (start.isBefore(newStart) || end.isAfter(newEnd)) return true;

  return false;
};

const getNewRange = (start, end, cachedStart, cachedEnd, init) => {
  let newStart = cachedStart.clone();
  let newEnd = cachedEnd.clone();

  if (init) return [ newStart, newEnd ];

  if (start.isSameOrAfter(cachedStart) && end.isSameOrBefore(cachedEnd)) return [];

  if (start.isBefore(cachedStart)) newStart = getNewWindowStart(cachedStart);

  if (end.isAfter(cachedEnd)) newEnd = getNewWindowEnd(cachedEnd);

  return [ newStart, newEnd ];
};

const sourceUrl = (source, state, newStart, newEnd, init) => {
  const flatState = flattenState(state);
  const { startQueryParam, endQueryParam, dateFormatter,
          date, view, cachedStart, cachedEnd } = flatState;

  let start = newStart;
  let end = newEnd;

  if (init) {
    start = cachedStart.clone();
    end = cachedEnd.clone();
  } else {
    if (newStart.isBefore(cachedStart)) end = cachedStart.clone().add(-1, 'day');
    if (newEnd.isAfter(cachedEnd)) start= cachedEnd.clone().add(1, 'day');
  }

  const [ startDate, endDate ] = [ start, end ].map(day => day.format(dateFormatter));

  const url = `${source}?${startQueryParam}=${startDate}&${endQueryParam}=${endDate}`;

  return encodeURI(url);
};

export const fetchEvent = (source, init, payload) => {
  const { newStart, newEnd } = payload;

  return (dispatch, getState) => {
    const { eventDataTransform } = flattenState(getState());

    return fetch(sourceUrl(source, getState(), newStart, newEnd, init), fetchInit)
      .then(response => response.json())
      .then(events => eventDataTransform(events, source))
      .then(events => dispatch(updateEvents(init, { ...payload, events, source })))
      .catch(err => console.error(err));
  };
};

export const fetchEventSources = (init = false, index = 0) => {
  return (dispatch, getState) => {
    const { eventSources, cachedStart, cachedEnd, date, view } = flattenState(getState());
    const [ start, end ] = getRange(date, view);
    let fetchNeededSources;

    if (!prevEventSources || init) prevEventSources = [];

    if (!init && shouldInit(start, end, cachedStart, cachedEnd, date)) {
      dispatch(updateEventsMeta({
        cachedStart: getCachedStart(date),
        cachedEnd: getCachedEnd(date)
      }));

      return dispatch(fetchEventSources(true));
    }

    let [ newStart, newEnd ] = getNewRange(start, end, cachedStart, cachedEnd, init);

    if (!newStart) {
      fetchNeededSources = _.difference(eventSources, prevEventSources);
    } else {
      fetchNeededSources = eventSources;
    }

    const len = fetchNeededSources.length;

    if (len > 0 && !newStart) {
      newStart = cachedStart.clone();
      newEnd = cachedEnd.clone();
    }

    const payload = {
      firstFetch: index === 0,
      lastFetch: index === len - 1,
      newStart,
      newEnd
    };

    if (index < len && newStart) {
      dispatch(fetchEvent(fetchNeededSources[index], init, payload));

      return dispatch(fetchEventSources(init, index + 1));
    } else {
      if (len > 0) prevEventSources = eventSources;

      return Promise.resolve();
    }
  };
};
