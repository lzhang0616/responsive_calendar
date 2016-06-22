import moment from 'moment';

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
