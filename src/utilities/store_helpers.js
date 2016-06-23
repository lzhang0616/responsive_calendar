export const flattenState = state => {
  const { calendarManager, eventsManager} = state;

  return {...calendarManager, ...eventsManager};
};
