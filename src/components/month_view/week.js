import React, { Component } from 'react';
import Day from './day';

export default class Week extends Component {
  renderDays() {
    const { days, onClickEvent} = this.props;

    return days.map((day, index) => {
      const { events, tense, date, selected, first } = day;
      return (
        <Day key={index} events={events} tense={tense} date={date}
          selected={selected} first={first} onClickEvent={onClickEvent} />
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
