import { BACK_IN_DATE, BACK_TO_TODAY, FORWARD_IN_DATE, UPDATE_DATE } from './actions_types';

export const backInDate = view => ({
  type: BACK_IN_DATE,
  view
});

export const backToToday = view => ({
  type: BACK_TO_TODAY,
  view
});

export const forwardInDate = view => ({
  type: FORWARD_IN_DATE,
  view
});

export const updateDate = newDate => ({
  type: UPDATE_DATE,
  newDate
});
