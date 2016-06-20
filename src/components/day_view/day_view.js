import React, { Component } from 'react';
import { datetime } from '../../utilities/calendar_helpers';

export default class DayView extends Component {
  constructor(props) {
    super(props);
  }

  renderEvents() {
    const { events } = this.props;

    return events.map((event, index) => {
      const { type, title, onClick } = event;

      if (!type || !title) return null;

      return <Event key={index} type={type} title={title} onClick={onClick}/>;
    });
  }

  render() {
    const { date } = this.props;

    return (
      <div className="fc-calendar fc-one-row">
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
