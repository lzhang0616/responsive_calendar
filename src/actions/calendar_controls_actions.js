import { BACK_IN_DATE, BACK_TO_TODAY, FORWARD_IN_DATE, UPDATE_DATE } from './actions_types';

export const backInDate = view => {
  return {
    type: BACK_IN_DATE,
    view
  };
};

export const backToToday = view => {
  return {
    type: BACK_TO_TODAY,
    view
  };
};

export const forwardInDate = view => {
  return {
    type: FORWARD_IN_DATE,
    view
  };
};

export const updateDate = newDate => {
  return {
    type: UPDATE_DATE,
    newDate
  };
};
