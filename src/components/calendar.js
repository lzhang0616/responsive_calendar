import BigCalendar from 'react-big-calendar';
import React from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './calendar.css';

BigCalendar.momentLocalizer(moment);

const events = [];

let formats = {
  dateFormat: 'D',
  dayFormat: 'ddd M/D',
  dayHeaderFormat: 'dddd D, YYYY',
  dayRangeHeaderFormat: ({ start, end }, culture, local) => {
    const startFormat = moment(start).isSame(end, 'year') ? 'MMM D' : 'MMM D, YYYY';
    const endFormat = moment(start).isSame(end, 'month') ? 'D, YYYY' : 'MMM D, YYYY';
    return `${local.format(start, startFormat, culture)} - ${local.format(end, endFormat, culture)}`;
  }
};

const Calendar = props => (
  <BigCalendar
    events={props.events}
    formats={formats}
    startAccessor='start'
    endAccessor='end'
  />
);

export default Calendar;
