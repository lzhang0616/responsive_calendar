import React from 'react';
import ResponsiveCalendar, { dispatchActions, addSources, removeSources } from './index';
import { render, unmountComponentAtNode } from 'react-dom';

let defaultOptions = { renderDivId: 'root' };
let rendered = false;

export const calendar = (options = {}) => {
  if (rendered) unmountComponentAtNode(document.getElementById(defaultOptions.renderDivId));

  defaultOptions = { ...defaultOptions, ...options };
  const { renderDivId, ...others } = defaultOptions;

  render(
    <ResponsiveCalendar { ...others } />,
    document.getElementById(renderDivId)
  );

  rendered = true;
};

export const updateViewAndDate = dispatchActions;

export const addEventSource = addSources;

export const removeEventSource = removeSources;
