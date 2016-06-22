import React, { Component } from 'react';
import './event.scss';

export default class Event extends Component {
  renderEventLinks() {
    const { type, title } = this.props;

    let aElementClass = `fc-event fc-event-${type}`;
    let iElementClass = '';

    switch (type) {
      case 'birthday':
        iElementClass = 'fa fa-fw fa-birthday-cake';
        break;
      case 'personal':
        iElementClass = 'fa fa-fw fa-calendar-o';
        break;
      case 'work':
        iElementClass = 'fa fa-fw fa-check';
    }

    return (
      <a className={aElementClass}>
        <i className={iElementClass}></i>
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
