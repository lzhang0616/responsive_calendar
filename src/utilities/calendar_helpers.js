import moment from 'moment';
import _ from 'lodash';

export const datetime = (date, format) => {
  return moment(date).format(format);
};

export const fromNow = date => {
  return moment(date).fromNow();
};

export const weekday = (number) => {
  return moment().weekday(number);
};

export const today = () => {
  return moment().startOf('day');
};

export const getStartDate = (date, view) => {
  let startDate;

  switch (view) {
    case 'month':
      startDate = moment(date).startOf('month').startOf('week');
      break;
    case 'week':
      startDate = moment(date).startOf('week');
      break;
    case 'day':
      startDate = date;
      break;
    default:
      break;
  }

  return startDate;
};

export const getEndDate = (date, view) => {
  let endDate;

  switch (view) {
    case 'month':
      endDate = moment(date)
        .endOf('month')
        .add(1, 'weeks')
        .endOf('week');
        break;
    case 'week':
      endDate = moment(date).endOf('week');
      break;
    case 'day':
      endDate = date;
      break;
    default:
      break;
  }

  return endDate;
};

const getTense = (date, today) => {
  let tense = '';

  if (date.isBefore(today)) {
    tense = 'past';
  } else if (date.isSame(today, 'day')) {
    tense = 'today';
  } else {
    tense = 'future';
  }

  return tense;
};

export const getDays = ({ date, view, events, selected }) => {
  let current;
  let day;
  const startDate = getStartDate(date, view).clone();
  const endDate = getEndDate(date, view);
  const today = moment().startOf('day');

  const eventsByDay = _.groupBy(events, 'date');

  const days = [];

  do {
    current = startDate.clone();
    day = {
      date: current.toDate(),
      tense: getTense(current, today),
      first: current.date() === 1,
      events: eventsByDay[current.format('YYYY-MM-DD')] || [],
      selected
    };

    days.push(day);
    startDate.add(1, 'days');
  } while (startDate.isBefore(endDate));

  return days;
};

export const getWeeks = state => {
  let i;
  let len;
  const days = getDays(state);

  const weeks = [];
  for (i = 0, len = days.length; i < len; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};
