export const flattenState = ({ calendarManager, eventsManager }) => { return { ...calendarManager, ...eventsManager } };
