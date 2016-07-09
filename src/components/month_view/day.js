import React, { Component } from 'react';
import { datetime } from '../../utilities/calendar_helpers';
import renderEvents from '../../utilities/event_limit_helpers';
import DayLabel from './day_label';

export default class Day extends Component {
  render() {
    const { tense, date, selected, first } = this.props;

    let dayClass = `${datetime(date, 'MMM ddd')} fc-${tense}`;

    if (!selected.isSame(date, 'month')) dayClass += ' other_month';

    return (
      <div className={dayClass}>
        <DayLabel date={date} first={first} />
        {renderEvents(this.props, 'month')}
      </div>
    );
  }
}
