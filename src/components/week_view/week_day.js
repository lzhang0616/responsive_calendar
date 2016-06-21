import React, { Component } from 'react';
import Event from '../event';
import { datetime } from '../../utilities/calendar_helpers';

export default class WeekDay extends Component {
  renderEvents() {
    const { events } = this.props;

    return events.map((event, index) => {
      const { type, title, onClick } = event;

      if (!type || !title) return null;

      return <Event key={index} type={type} title={title} onClick={onClick}/>;
    });
  }

  render() {
    const { tense, date, selected } = this.props;

    let dayClass = `${datetime(date, 'MMM ddd')} fc-${tense}`;

    if (!selected.isSame(date, 'month')) dayClass += ' other_month';

    return (
      <div className={dayClass}>
        <span className="fc-weekday">{datetime(date, 'ddd D')}</span>
        {this.renderEvents()}
      </div>
    );
  }
}
