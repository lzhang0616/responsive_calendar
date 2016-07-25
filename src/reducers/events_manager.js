import _ from 'lodash';
import { eventsManagerInit } from '../store/default_initial_state';
import { INIT_EVENTS, UPDATE_EVENTS, UPDATE_EVENT_SOURCES,
         UPDATE_EVENTS_META, ADD_EVENT_SOURCES, REMOVE_EVENT_SOURCES,
         UPDATE_DISABLED_EVENT_TYPES, ADD_DISABLED_EVENT_TYPES,
         REMOVE_DISABLED_EVENT_TYPES } from '../actions/actions_types';

const updateMeta = (state, metaShouldUpdate) => {
  const { eventsMetaData, ...others } = state;
  const updatedMeta = { ...eventsMetaData, ...metaShouldUpdate };
  return { ...others, eventsMetaData: updatedMeta };
};

const concatEvents = (state, events, source) => {
  // Combine new events with original, remove duplicates:
  const newEvents = _.uniqBy(state.events.concat(events), state.eventsMetaData.dedupEvents);
  // Name the attribute specific intentionally to avoid potential naming conflict
  if (source) newEvents.forEach(event => event._responsiveCalendarSource = source);
  return { ...state, events: newEvents };
};

const eventsManager = (state = eventsManagerInit,
                       { type, events, eventSources, firstFetch,
                         lastFetch, newStart, newEnd, metaShouldUpdate, eventTypes, source }) => {
  let newState = state;

  switch (type) {
    case INIT_EVENTS:
      if (firstFetch) newState = { ...state, events: [] };
      newState = concatEvents(newState, events, source);
      if (lastFetch) {
        newState = updateMeta(newState,
                              { cachedStart: newStart,
                                cachedEnd: newEnd });
      }
      break;
    case UPDATE_EVENTS:
      newState = concatEvents(state, events, source);
      if (lastFetch) {
        newState = updateMeta(newState,
                              { cachedStart: newStart,
                                cachedEnd: newEnd });
      }
      break;
    case UPDATE_EVENT_SOURCES:
      if (_.isArray(eventSources)) newState = { ...state, eventSources };
      break;
    case ADD_EVENT_SOURCES: {
      let newSources;
      if (_.isArray(eventSources)) {
        newSources = _.union(state.eventSources, eventSources);
      } else if (_.isString(eventSources)) {
        newSources = _.union(state.eventSources, [eventSources]);
      }
      newState = { ...state, eventSources: newSources };
      break;
    }
    case REMOVE_EVENT_SOURCES: {
      let newSources;
      if (_.isArray(eventSources)) {
        newSources = _.difference(state.eventSources, eventSources);
      } else if (_.isString(eventSources)) {
        newSources = _.difference(state.eventSources, [eventSources]);
      }
      newState = { ...state, eventSources: newSources };
      break;
    }
    case UPDATE_DISABLED_EVENT_TYPES:
      if (_.isArray(eventTypes)) newState = { ...state, disabledEventTypes: eventTypes };
      break;
    case ADD_DISABLED_EVENT_TYPES: {
      let newTypes;
      if (_.isArray(eventTypes)) {
        newTypes = _.union(state.disabledEventTypes, eventTypes);
      } else if (_.isString(eventTypes)) {
        newTypes = _.union(state.disabledEventTypes, [eventTypes]);
      }
      newState = { ...state, disabledEventTypes: newTypes };
      break;
    }
    case REMOVE_DISABLED_EVENT_TYPES: {
      let newTypes;
      if (_.isArray(eventTypes)) {
        newTypes = _.difference(state.disabledEventTypes, eventTypes);
      } else if (_.isString(eventTypes)) {
        newTypes = _.difference(state.disabledEventTypes, [eventTypes]);
      }
      newState = { ...state, disabledEventTypes: newTypes };
      break;
    }
    case UPDATE_EVENTS_META:
      newState = updateMeta(state, metaShouldUpdate);
      break;
    default:
      break;
  }

  return newState;
};

export default eventsManager;
