import React, { Component } from 'react';
import './event.scss';

export default class Event extends Component {
  renderEventLinks() {
    const { type, title } = this.props;

    let aElementClass = '';
    let iElementClass = '';

    switch (type) {
      case 'birthday':
        aElementClass = 'fc-event label label-success';
        iElementClass = 'fa fa-fw fa-birthday-cake';
        break;
      case 'personal':
        aElementClass = 'fc-event label label-info';
        iElementClass = 'fa fa-fw fa-calendar-o';
        break;
      case 'work':
        aElementClass = 'fc-event label label-warning';
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
