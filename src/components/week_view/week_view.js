import React, { Component } from 'react';
import WeekDay from './week_day';
import WeekHeader from './week_header';

export default class WeekView extends Component {
  renderDays() {
    const { days, ...others } = this.props;

    return days.map((day, index) => <WeekDay key={index} {...day} {...others} />);
  }

  render() {
    const { days } = this.props;

    return (
      <div className="fc-calendar fc-week-view">
        <WeekHeader days={days} />
        <div className="fc-body">
          <div className="fc-row">
            {this.renderDays()}
          </div>
        </div>
      </div>
    );
  }
}
