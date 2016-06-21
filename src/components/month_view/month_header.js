import React, { Component } from 'react';
import { datetime, weekday } from '../../utilities/calendar_helpers';

export default class MonthHeader extends Component {
  renderWeekdays() {
    const weekdays = [0, 1, 2, 3, 4, 5, 6];

    return weekdays.map((current, index) => <div key={index}>{datetime(weekday(current), 'ddd')}</div>);
  }

  render() {
    return (
      <div className='fc-head'>
        {this.renderWeekdays()}
      </div>
    );
  }
}
