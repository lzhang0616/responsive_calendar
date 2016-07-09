import React, { Component } from 'react';
import Day from './day';

export default class Week extends Component {
  renderDays() {
    const { days, ...others } = this.props;

    return days.map((day, index) => <Day key={index} {...others} {...day} />);
  }

  render() {
    return (
      <div className='fc-row'>
        {this.renderDays()}
      </div>
    );
  }
}
