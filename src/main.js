import React from 'react';
import _ from 'lodash';
import ResponsiveCalendar, { dispatchActions, addSources,
                             removeSources, addHiddenEventTypes, removeHiddenEventTypes } from './index';
import { render, unmountComponentAtNode } from 'react-dom';

let defaultOptions = { renderDivId: 'root' };
let rendered = false;

const mapViewsToProps = (views={}) => {
  const viewTypes = ['day', 'week', 'month'];
  const props = {};

  viewTypes.forEach((viewType) => {
    const viewConfig = views[viewType];

    if (!viewConfig) return;

    _.forEach(viewConfig, (config, key) => props[`${viewType}View${_.upperFirst(key)}`] = config);
  });

  return props;
};

export const calendar = (options = {}) => {
  if (rendered) unmountComponentAtNode(document.getElementById(defaultOptions.renderDivId));

  defaultOptions = { ...defaultOptions, ...options };
  const { renderDivId, views, ...others } = defaultOptions;

  const viewConfigs = mapViewsToProps(views);

  render(
    <ResponsiveCalendar {...others} {...viewConfigs} />,
    document.getElementById(renderDivId)
  );

  rendered = true;
};

export const updateViewAndDate = dispatchActions;

export const addEventSource = addSources;

export const removeEventSource = removeSources;

export const removeVisibleEventTypes = addHiddenEventTypes;

export const addVisibleEventTypes = removeHiddenEventTypes;
