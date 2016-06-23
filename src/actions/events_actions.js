import fetch from 'isomorphic-fetch';
import { INIT_EVENTS, UPDATE_EVENTS } from './actions_types';
import { getRange, flattenState } from '../utilities/calendar_helpers';

const updateEvents = (events, init, firstFetch) => {
  let type;
  if (init) {
    type = INIT_EVENTS;
  } else {
    type = UPDATE_EVENTS;
  }

  return {
    type,
    events,
    firstFetch
  };
};

const sourceUrl = (source, state) => {
  const flatState = flattenState(state);
  const { startQueryParam, endQueryParam, dateFormatter, date, view } = flatState;

  const [ start, end ] = getRange(date, view).map(day => day.format(dateFormatter));

  const url = `${source}?${startQueryParam}=${start}&${endQueryParam}=${end}`;

  return encodeURI(url);
};

export const fetchEvent = (source, init, firstFetch) => {
  return (dispatch, getState) => {
    return fetch(sourceUrl(source, getState()))
      .then(response => response.json())
      .then(events => dispatch(updateEvents(events, init, firstFetch)))
      .catch(err => console.error(err));
  };
};

export const fetchEventSources = (init = false, index = 0) => {
  return (dispatch, getState) => {
    const { eventsManager } = getState();
    const { eventSources } = eventsManager;

    if (index < eventSources.length) {
      dispatch(fetchEvent(eventSources[index], init, index === 0));

      return dispatch(fetchEventSources(init, index + 1));
    } else {
      return Promise.resolve();
    }
  };
};
