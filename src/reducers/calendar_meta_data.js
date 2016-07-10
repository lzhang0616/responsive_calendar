import { calendarMetaDataInit } from '../store/default_initial_state';
import { UPDATE_CALENDAR_META } from '../actions/actions_types';

const calendarMetaData = (state = calendarMetaDataInit, { type, calendarMeta }) => {
  let newState = state;

  switch (type) {
    case UPDATE_CALENDAR_META:
      newState = { ...state, ...calendarMeta };
      break;
    default:
      break;
  }

  return newState;
};

export default calendarMetaData;
