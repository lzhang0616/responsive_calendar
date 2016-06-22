export const flattenState = (state) => {
  const { calendarManager, eventsManager} = state;

  return Object.assign({}, calendarManager, eventsManager);
};
