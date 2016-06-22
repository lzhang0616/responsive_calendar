import { INIT_EVENTS } from './actions_types';

export const initEvents = events => {
  return {
    type: INIT_EVENTS,
    events
  };
};
