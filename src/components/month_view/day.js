import React, { Component } from 'react';
import { datetime } from '../../utilities/calendar_helpers';
import DayLabel from './day_label';
import Event from '../event';

export default class Day extends Component {
  renderEvents() {
    const { events, onClickEvent } = this.props;

    return events.map((event, index) => {
      const { type, title } = event;

      if (!type || !title) return null;

      return <Event key={index} type={type} title={title} onClick={e => onClickEvent(event, e.currentTarget)}/>;
    });
  }

  render() {
    const { tense, date, selected, first } = this.props;

    let dayClass = `${datetime(date, 'MMM ddd')} fc-${tense}`;

    if (!selected.isSame(date, 'month')) dayClass += ' other_month';

    return (
      <div className={dayClass}>
        <DayLabel date={date} first={first} />
        {this.renderEvents()}
      </div>
    );
  }
}
