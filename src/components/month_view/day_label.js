import React, { Component } from 'react';
import { datetime } from '../../utilities/calendar_helpers';

export default class DayLabel extends Component {
  constructor(props) {
    super(props);
  }

  renderFirst() {
    const { first, date } = this.props;

    if (first) return datetime(date, 'MMM');

    return null;
  }

  render() {
    const { date } = this.props;

    return (
      <div>
        <span className='fc-date'>
        {this.renderFirst()}
        {datetime(date, 'D')}
        </span>
        <span className='fc-weekday'>{datetime(date, 'ddd')}</span>
      </div>
    );
  }
}
