import moment from 'moment';

const date = moment().startOf('day');

export default {
  selected: date,
  events: [],
  date
};
