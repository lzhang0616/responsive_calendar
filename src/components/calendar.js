import React, { Component } from 'react';
import MonthView from './month_view/month_view.js';
import WeekView from './week_view/week_view';
import DayView from './day_view/day_view';
import CalendarControls from './calendar_controls';
import ViewControls from './view_controls';
import { datetime } from '../utilities/calendar_helpers';

import './calendar.less';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  renderView() {
    const { view, weeks, days, date, events } = this.props;

    let showingView;

    switch(view) {
      case 'month':
        showingView = <MonthView weeks={weeks} />;
        break;
      case 'week':
        showingView = <WeekView days={days} />;
        break;
      case 'day':
        showingView = <DayView date={date} events={events} />;
        break;
    }

    return showingView;
  }

  renderHeader() {
    const { view, date } = this.props;

    let header;
    if (view === 'day') {
      header = <h2>{datetime(date, 'MMMM D, YYYY')}</h2>;
    } else {
      header = <h2>{datetime(date, 'MMMM YYYY')}</h2>;
    }

    return header;
  }

  render() {
    const { date, onBack, onToday, onForward, showDayView, showWeekView, showMonthView, view } = this.props;

    return (
      <div className='fc-calendar-container'>
        <div className='row'>
          <div className='col-xs-5'>
            {this.renderHeader()}
          </div>
          <div className='col-xs-7 text-right'>
            <CalendarControls calendarControlsClass='h2' onBack={onBack}
              onToday={onToday} onForward={onForward} view={view} />
            <ViewControls viewControlsClass='h2' showDayView={showDayView}
              showWeekView={showWeekView} showMonthView={showMonthView} view={view} />
          </div>
        </div>
        {this.renderView()}
      </div>
    );
  }
}
