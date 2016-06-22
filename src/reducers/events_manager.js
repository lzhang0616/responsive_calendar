import { eventsManagerInit } from '../store/default_initial_state';
import { INIT_EVENTS } from '../actions/actions_types';

const eventsManager = (state = eventsManagerInit, action) => {
  const { type, events } = action;

  let newState = state;

  switch (type) {
    case INIT_EVENTS:
      const newEvents = state.events.concat(events);
      newState = Object.assign({}, state, { events: newEvents });
      break;
    default:
      break;
  }

  return newState;
};

export default eventsManager;
