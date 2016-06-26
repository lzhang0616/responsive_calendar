import _ from 'lodash';
import { eventsManagerInit } from '../store/default_initial_state';
import { INIT_EVENTS, UPDATE_EVENTS, UPDATE_EVENT_SOURCES,
         UPDATE_EVENTS_META } from '../actions/actions_types';

const updateMeta = (state, metaShouldUpdate) => {
  const { eventsMetaData, ...others } = state;
  const updatedMeta = { ...eventsMetaData, ...metaShouldUpdate };
  return { ...others, eventsMetaData: updatedMeta };
};

const concatEvents = (state, events) => {
  // Combine new events with original, remove duplicates:
  const newEvents = _.uniqBy(state.events.concat(events), event => event.id);
  return { ...state, events: newEvents };
};

const eventsManager = (state = eventsManagerInit,
                       { type, events, eventSources, firstFetch,
                         lastFetch, newStart, newEnd, metaShouldUpdate }) => {
  let newState = state;

  switch (type) {
    case INIT_EVENTS:
      if (firstFetch) newState = { ...state, events: [] };
      newState = concatEvents(state, events);
      break;
    case UPDATE_EVENTS:
      newState = concatEvents(state, events);
      break;
    case UPDATE_EVENT_SOURCES:
      newState = { ...state, eventSources };
      break;
    case UPDATE_EVENTS_META:
      newState = updateMeta(state, metaShouldUpdate);
      break;
    default:
      break;
  }

  if (lastFetch) newState = updateMeta(newState, { cachedStart: newStart, cachedEnd: newEnd });

  return newState;
};

export default eventsManager;
