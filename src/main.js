import React from 'react';
import store from './store/calendar_store';
import ResponsiveCalendar from './index';
import { render } from 'react-dom';

export const calendar = (options = {}) => {
  render(
    <ResponsiveCalendar store={store} options={options} />,
    document.getElementById('root')
  );
};
