import React, { Component } from 'react';

export default class ViewControls extends Component {
  renderButtonClass(currentView) {
    const { view } = this.props;

    if (currentView === view) return 'active';

    return '';
  }

  render() {
    const { viewControlsClass, showDayView, showWeekView, showMonthView } = this.props;

    const className = `btn-group btn-group-sm ${viewControlsClass}`;

    return (
      <div className={className}>
        <button className={`btn btn-default day ${this.renderButtonClass('day')}`}
          onClick={showDayView}>
          Day
        </button>
        <button className={`btn btn-default week ${this.renderButtonClass('week')}`}
          onClick={showWeekView}>
          Week
        </button>
        <button className={`btn btn-default month ${this.renderButtonClass('month')}`}
          onClick={showMonthView}>
          Month
        </button>
      </div>
    );
  }
}
