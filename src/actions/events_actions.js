import { INIT_EVENTS } from './actions_types';
import fetch from 'isomorphic-fetch';

const initEvents = events => {
  return {
    type: INIT_EVENTS,
    events
  };
};

export const fetchEvent = source => {
  return dispatch => {
    return fetch(source)
      .then(response => response.json())
      .then(events => dispatch(initEvents(events)))
      .catch(err => console.error(err));
  };
};

export const fetchEventSources = (index = 0) => {
  return (dispatch, getState) => {
    const { eventsManager } = getState();
    const { eventSources } = eventsManager;

    if (index < eventSources.length) {
      dispatch(fetchEvent(eventSources[index]));

      return dispatch(fetchEventSources(index + 1));
    } else {
      return Promise.resolve();
    }
  };
};
