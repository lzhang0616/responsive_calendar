import React, { Component } from 'react';

export default class CalendarControls extends Component {
  render() {
    const { calendarControlsClass, onBack, onToday, onForward, view } = this.props;

    const className = `btn-group btn-group-sm ${calendarControlsClass}`;

    return (
      <div className={className}>
        <button className='btn btn-default' onClick={() => onBack(view)}>
          <i className="fa fa-angle-left"></i>
        </button>
        <button className='btn btn-default' onClick={() => onToday(view)}>
          Today
        </button>
        <button className='btn btn-default' onClick={() => onForward(view)}>
          <i className="fa fa-angle-right"></i>
        </button>
      </div>
    );
  }
  }
