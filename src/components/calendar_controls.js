import React, { Component } from 'react';

export default class CalendarControls extends Component {
  render() {
    const { calendarControlsClass, onBack, onToday, onForward, view } = this.props;

    const className = `btn-group btn-group-sm ${calendarControlsClass}`;

    return (
      <div className={className}>
        <button className='btn btn-default back' onClick={() => onBack(view)}>
          <i className="icon icon-angle-left"></i>
        </button>
        <button className='btn btn-default today' onClick={() => onToday(view)}>
          Today
        </button>
        <button className='btn btn-default fwd' onClick={() => onForward(view)}>
          <i className="icon icon-angle-right"></i>
        </button>
      </div>
    );
  }
}
