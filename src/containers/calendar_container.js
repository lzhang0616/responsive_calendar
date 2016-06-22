import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../components/calendar';
import moment from 'moment';
import _ from 'lodash';
import { flattenState } from '../utilities/store_helpers';
import { backInDate, backToToday, forwardInDate } from '../actions/calendar_controls_actions';
import { showDayView, showWeekView, showMonthView } from '../actions/view_controls_actions';
import { initEvents } from '../actions/events_actions';

class CalendarContainer extends Component {
  render() {
    return <Calendar {...this.props} />;
  }
}

const getStartDate = (date, view) => {
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

const getEndDate = (date, view) => {
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

const getDays = ({ date, view, events, selected }) => {
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

const getWeeks = (state) => {
  let i;
  let len;
  const days = getDays(state);

  const weeks = [];
  for (i = 0, len = days.length; i < len; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};

const mapStateToProps = (state) => {
  const flatState = flattenState(state);
  const { date, view } = flatState;

  const props = { date, view };

  switch (view) {
    case 'month':
      props.weeks = getWeeks(flatState);
      break;
    case 'week':
      props.days = getDays(flatState);
      break;
    case 'day':
      const day = getDays(flatState)[0];
      props.date = day.date;
      props.events = day.events;
      break;
    default:
      break;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBack: (view) => dispatch(backInDate(view)),
    onToday: (view) => dispatch(backToToday(view)),
    onForward: (view) => dispatch(forwardInDate(view)),
    showDayView: () => dispatch(showDayView()),
    showWeekView: () => dispatch(showWeekView()),
    showMonthView: () => dispatch(showMonthView()),
    initEvents: (events) => dispatch(initEvents(events))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
