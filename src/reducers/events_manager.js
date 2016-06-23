import { eventsManagerInit } from '../store/default_initial_state';
import { INIT_EVENTS } from '../actions/actions_types';
import _ from 'lodash';

const eventsManager = (state = eventsManagerInit, action) => {
  const { type, events } = action;

  let newState = state;

  switch (type) {
    case INIT_EVENTS:
      // Combine new events with original, remove duplicates:
      const newEvents = _.uniqBy(state.events.concat(events), event => event.id);
      newState = { ...state, events: newEvents};
      break;
    default:
      break;
  }

  return newState;
};

export default eventsManager;
