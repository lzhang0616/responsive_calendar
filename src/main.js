import React from 'react';
import { render } from 'react-dom';
import store from './store/calendar_store';
import ResponsiveCalendar from './app';

export const calendar = (options = {}) => {
  render(
    <ResponsiveCalendar store={store} options={options} />,
    document.getElementById('root')
  );
};
