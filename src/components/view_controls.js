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
        <button className={`btn btn-default ${this.renderButtonClass('day')}`}
          onClick={showDayView}>
          <span className='hidden-xs'>Day</span>
          <span className='visible-xs'>1</span>
        </button>
        <button className={`btn btn-default ${this.renderButtonClass('week')}`}
          onClick={showWeekView}>
          <span className='hidden-xs'>Week</span>
          <span className='visible-xs'>7</span>
        </button>
        <button className={`btn btn-default ${this.renderButtonClass('month')}`}
          onClick={showMonthView}>
          <span className='hidden-xs'>Month</span>
          <span className='visible-xs'>30</span>
        </button>
      </div>
    );
  }
}
