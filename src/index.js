import 'babel-polyfill';
import React, { Component } from 'react';
import CalendarContainer from './containers/calendar_container';
import { Provider } from 'react-redux';

import './app.css';

export default class ResponsiveCalendar extends Component {
  render() {
    const { store, options } = this.props;

    return (
      <Provider store={store}>
        <CalendarContainer {...options}/>
      </Provider>,
    );
  }
}
