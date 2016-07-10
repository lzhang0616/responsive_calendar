import React, { Component } from 'react';
import renderEvents from '../../utilities/event_limit_helpers';
import { datetime } from '../../utilities/calendar_helpers';

export default class DayView extends Component {
  render() {
    const { date } = this.props;

    return (
      <div className="fc-calendar fc-day-view">
        <div className="fc-head text-left">
          {datetime(date, 'dddd')}
        </div>
        <div className="fc-body">
          <div className="fc-row">
            {renderEvents(this.props, 'day')}
          </div>
        </div>
      </div>
    );
  }
}
