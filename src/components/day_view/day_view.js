import React, { Component } from 'react';
import Event from '../event';
import { datetime } from '../../utilities/calendar_helpers';

export default class DayView extends Component {
  renderEvents() {
    const { events, onClickEvent } = this.props;

    return events.map((event, index) => {
      const { type, title } = event;

      if (!type || !title) return null;

      return <Event key={index} type={type} title={title} onClick={e => onClickEvent(event, e.currentTarget)}/>;
    });
  }

  render() {
    const { date } = this.props;

    return (
      <div className="fc-calendar fc-day-view">
        <div className="fc-head text-left">
          {datetime(date, 'dddd')}
        </div>
        <div className="fc-body">
          <div className="fc-row">
            {this.renderEvents()}
          </div>
        </div>
      </div>
    );
  }
}
