import React, { Component } from 'react';
import renderEvents from '../../utilities/event_limit_helpers';
import { datetime } from '../../utilities/calendar_helpers';

export default class WeekDay extends Component {
  render() {
    const { tense, date, selected } = this.props;

    let dayClass = `${datetime(date, 'MMM ddd')} fc-${tense}`;

    if (!selected.isSame(date, 'month')) dayClass += ' other_month';

    return (
      <div className={dayClass}>
        <span className="fc-weekday">{datetime(date, 'ddd D')}</span>
        {renderEvents(this.props, 'week')}
      </div>
    );
  }
}
