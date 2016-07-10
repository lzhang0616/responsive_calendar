import React, { Component } from 'react';
import MonthHeader from './month_header';
import Week from './week';

export default class MonthView extends Component {
  renderWeeks() {
    const { weeks, ...others } = this.props;

    return weeks.map((week, index) => <Week key={index} days={week} {...others} />);
  }

  render() {
    return (
      <div className='fc-calendar fc-month-view'>
        <MonthHeader />
        <div className='fc-body'>
          {this.renderWeeks()}
        </div>
      </div>
    );
  }
}
