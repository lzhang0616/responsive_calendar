import React, { Component } from 'react';
import CalendarControls from './calendar_controls';
import DayView from './day_view/day_view';
import MonthView from './month_view/month_view.js';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ViewControls from './view_controls';
import WeekView from './week_view/week_view';
import { datetime } from '../utilities/calendar_helpers';
import { findDOMNode } from 'react-dom';

import './calendar.scss';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      embedded: props.width && props.height,
      display: 'horizontal'
    };
  }

  componentDidMount() {
    const node = findDOMNode(this);
    this.setState({ display: node.offsetWidth <= 700 ? 'vertical' : 'horizontal' });
    ResizeSensor(node, () => {
      // TODO 700 should be a prop as well
      this.setState({ display: node.offsetWidth <= 700 ? 'vertical' : 'horizontal' });
    });
  }

  renderView() {
    const { view, weeks, days, date, events } = this.props;

    let showingView;

    switch (view) {
      case 'month':
        showingView = <MonthView weeks={weeks} />;
        break;
      case 'week':
        showingView = <WeekView days={days} />;
        break;
      case 'day':
        showingView = <DayView date={date} events={events} />;
        break;
      default:
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

  displayClass() {
    return `fc-calendar-container ${this.state.display} ${this.state.embedded ? 'embedded' : ''}`;
  }

  render() {
    const { onBack, onToday, onForward, showDayView,
            showWeekView, showMonthView, view } = this.props;
    // TODO optional
    const style = {
      maxWidth: this.props.width,
      maxHeight: this.props.height
    };
    return (
      <div className={this.displayClass()} style={style}>
        <header className='row'>
          <div className='col-sm-5'>
            {this.renderHeader()}
          </div>
          <div className='col-sm-7'>
            <CalendarControls calendarControlsClass='h2' onBack={onBack}
              onToday={onToday} onForward={onForward} view={view} />
            <ViewControls viewControlsClass='h2 pull-right' showDayView={showDayView}
              showWeekView={showWeekView} showMonthView={showMonthView} view={view} />
          </div>
        </header>
        <section>
          {this.renderView()}
        </section>
      </div>
    );
  }
}
