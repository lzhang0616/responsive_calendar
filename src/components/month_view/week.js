import React, { Component } from 'react';
import Day from './day';

export default class Week extends Component {
  constructor(props) {
    super(props);
  }

  renderDays() {
    const { days } = this.props;

    return days.map((day, index) => {
      const { events, tense, date, selected, first } = day;
      return (
        <Day key={index} events={events} tense={tense} date={date}
          selected={selected} first={first} />
      );
    });
  }

  render() {
    return (
      <div className='fc-row'>
        {this.renderDays()}
      </div>
    );
  }
}
