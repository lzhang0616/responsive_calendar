import React, { Component } from 'react';
import { datetime } from '../../utilities/calendar_helpers';

export default class DayLabel extends Component {
  renderDate() {
    const { first, date } = this.props;

    return datetime(date, first ? 'MMM D' : 'D');
  }

  render() {
    const { date } = this.props;

    return (
      <div>
        <span className='fc-date'>
          {this.renderDate()}
        </span>
        <span className='fc-weekday'>
          {datetime(date, 'ddd')}
        </span>
      </div>
    );
  }
}
