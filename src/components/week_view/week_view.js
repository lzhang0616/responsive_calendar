import React, { Component } from 'react';
import WeekDay from './week_day';
import WeekHeader from './week_header';

export default class WeekView extends Component {
  constructor(props) {
    super(props);
  }

  renderDays() {
    const { days } = this.props;

    return days.map((day, index) => {
      const { events, tense, date, selected } = day;
      return (
        <WeekDay key={index} events={events} tense={tense} date={date} selected={selected} />
      );
    });
  }

  render() {
    const { days } = this.props;

    return (
      <div className="fc-calendar fc-one-row">
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
