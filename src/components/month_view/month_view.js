import React, { Component } from 'react';
import MonthHeader from './month_header';
import Week from './week';

export default class MonthView extends Component {
  constructor(props) {
    super(props);
  }

  renderWeeks() {
    const { weeks } = this.props;

    return weeks.map((week, index) => <Week key={index} days={week} />);
  }

  render() {

    return (
      <div className='fc-calendar fc-five-rows'>
        <MonthHeader />
        <div className='fc-body'>
          {this.renderWeeks()}
        </div>
      </div>
    );
  }
}
