import _ from 'lodash';
import { eventsManagerInit } from '../store/default_initial_state';
import { INIT_EVENTS, UPDATE_EVENTS } from '../actions/actions_types';

const repopulateEvents = (state, events) => {
  return { ...state, events };
};

const concatEvents = (state, events) => {
  // Combine new events with original, remove duplicates:
  const newEvents = _.uniqBy(state.events.concat(events), event => event.id);
  return { ...state, events: newEvents };
};

const eventsManager = (state = eventsManagerInit, action) => {
  const { type, events, firstFetch } = action;

  let newState = state;

  switch (type) {
    case INIT_EVENTS:
      newState = concatEvents(state, events);
      break;
    case UPDATE_EVENTS:
      if (firstFetch) {
        newState = repopulateEvents(state, events);
      } else {
        newState = concatEvents(state, events);
      }
      break;
    default:
      break;
  }

  return newState;
};

export default eventsManager;
