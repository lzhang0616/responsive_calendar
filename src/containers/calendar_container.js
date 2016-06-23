import React, { Component } from 'react';
import Calendar from '../components/calendar';
import { connect } from 'react-redux';
import { backInDate, backToToday, forwardInDate } from '../actions/calendar_controls_actions';
import { showDayView, showWeekView, showMonthView } from '../actions/view_controls_actions';
import { fetchEventSources } from '../actions/events_actions';
import { getDays, getWeeks, flattenState} from '../utilities/calendar_helpers';

class CalendarContainer extends Component {
  render() {
    return <Calendar {...this.props} />;
  }
}

const mapStateToProps = state => {
  const flatState = flattenState(state);
  const { date, view } = flatState;

  const props = { date, view };

  switch (view) {
    case 'month':
      props.weeks = getWeeks(flatState);
      break;
    case 'week':
      props.days = getDays(flatState);
      break;
    case 'day':
      const day = getDays(flatState)[0];
      props.date = day.date;
      props.events = day.events;
      break;
    default:
      break;
  }

  return props;
};

const batch = (dispatch, actions) => actions.forEach(action => dispatch(action));

const mapDispatchToProps = dispatch => {
  return {
    onBack: view => batch(dispatch, [ backInDate(view), fetchEventSources() ]),
    onToday: view => batch(dispatch, [ backToToday(view), fetchEventSources() ]),
    onForward: view => batch(dispatch, [ forwardInDate(view), fetchEventSources() ]),
    showDayView: () => batch(dispatch, [ showDayView(), fetchEventSources() ]),
    showWeekView: () => batch(dispatch, [ showWeekView(), fetchEventSources() ]),
    showMonthView: () => batch(dispatch, [ showMonthView(), fetchEventSources() ])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
