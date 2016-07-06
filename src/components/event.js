import React, { Component } from 'react';
import './event.scss';

export default class Event extends Component {
  renderEventLinks() {
    const { type, title } = this.props;

    return (
      <a className={`fc-event fc-event-${type}`}>
        {title}
      </a>
    );
  }

  render() {
    const { onClick } = this.props;

    return (
      <div className='fc-calendar-events' onClick={onClick}>
        {this.renderEventLinks()}
      </div>
    );
  }
}
