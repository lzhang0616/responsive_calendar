import React from 'react';
import ResponsiveCalendar, { dispatchActions } from './index';
import { render } from 'react-dom';

const defaultOptions = { renderDivId: 'root' };

export const calendar = (options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { renderDivId, ...others } = mergedOptions;

  render(
    <ResponsiveCalendar { ...others } />,
    document.getElementById(renderDivId)
  );
};

export const updateViewAndDate = dispatchActions;
