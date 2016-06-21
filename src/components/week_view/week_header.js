import React, { Component } from 'react';
import { datetime } from '../../utilities/calendar_helpers';

export default class WeekHeader extends Component {
  renderDays() {
    const { days } = this.props;

    return days.map((day, index) => <div key={index} className='text-center'>{datetime(day.date, 'ddd D')}</div>);
  }

  render() {
    return (
      <div className='fc-head'>
        {this.renderDays()}
      </div>
    );
  }
}
