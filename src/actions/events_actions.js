import fetch from 'isomorphic-fetch';
import { INIT_EVENTS, UPDATE_EVENTS } from './actions_types';
import { getRange, flattenState } from '../utilities/calendar_helpers';

const updateEvents = (init, payload) => {
  let type;
  if (init) {
    type = INIT_EVENTS;
  } else {
    type = UPDATE_EVENTS;
  }

  return { ...payload, type };
};

const getNewRange = (start, end, cachedStart, cachedEnd, init) => {
  let newStart = cachedStart.clone();
  let newEnd = cachedEnd.clone();

  if (init) return [ cachedStart, cachedEnd ];

  if (start.isSameOrAfter(cachedStart) && end.isSameOrBefore(cachedEnd)) return [];

  if (start.isBefore(cachedStart)) {
    newStart = newStart
      .add(-2, 'month')
      .startOf('month')
      .startOf('week');
  }

  if (end.isAfter(cachedEnd)) {
    newEnd = newEnd
      .add(2, 'month')
      .endOf('month')
      .add(1, 'week')
      .endOf('week');
  }

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

  const fetchHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const fetchInit = {
    method: 'GET',
    headers: fetchHeaders,
    credentials: 'same-origin'
  };

  return (dispatch, getState) => {
    return fetch(sourceUrl(source, getState(), newStart, newEnd, init), fetchInit)
      .then(response => response.json())
      .then(events => dispatch(updateEvents(init, { ...payload, events })))
      .catch(err => console.error(err));
  };
};

export const fetchEventSources = (init = false, index = 0) => {
  return (dispatch, getState) => {
    const { eventSources, cachedStart, cachedEnd, date, view } = flattenState(getState());
    const [ start, end ] = getRange(date, view);
    const [ newStart, newEnd ] = getNewRange(start, end, cachedStart, cachedEnd, init);
    let len = eventSources.length;

    const payload = {
      firstFetch: index === 0,
      lastFetch: index === len - 1,
      newStart,
      newEnd
    };

    if (index < len && newStart) {
      dispatch(fetchEvent(eventSources[index], init, payload));

      return dispatch(fetchEventSources(init, index + 1));
    } else {
      return Promise.resolve();
    }
  };
};
