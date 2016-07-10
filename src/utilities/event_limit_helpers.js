import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Event from '../components/event';

const renderShowMoreLink = (events, { eventLimitSize, eventLimitClick, date, updateViewAndDate }, suffix = 'more') => {
  const len = events.length;
  if (len <= eventLimitSize) return null;

  const onClick = (e) => {
    e.preventDefault();
    updateViewAndDate(eventLimitClick, moment(date).format('YYYY-MM-DD'));
  };

  return <a key={len + 1} onClick={onClick} href='' className="fc-more" >
           {`+${len - eventLimitSize} ${suffix}`}
         </a>;
};

const renderEvent = (event, index, onClickEvent, clickEnabled = true) => {
  const { type, title } = event;

  if (!type || !title) return null;

  const eventProps = {
    type,
    title,
    key: index
  };

  if (clickEnabled) eventProps.onClick = e => onClickEvent(event, e.currentTarget);

  return <Event {...eventProps} />;
};

const renderEventsWithoutLimit = (props) => {
  const { events, onClickEvent } = props;

  return events.map((event, index) => renderEvent(event, index, onClickEvent));
};

const renderEventsWithPlainLimit = (props) => {
  const { events, onClickEvent, eventLimitSize } = props;

  const eventsRendered = events
          .slice(0, eventLimitSize)
          .map((event, index) => renderEvent(event, index, onClickEvent));

  const showMoreLink = renderShowMoreLink(events, props);

  if (showMoreLink) eventsRendered.push(showMoreLink);

  return eventsRendered;
};

const summaryLimitEventTitle = (eventType, eventCount) => {
  return `${eventType}: ${eventCount} events`;
};

const renderEventsWithSummaryLimit = (props)  => {
  const { events, onClickEvent, eventLimitSize } = props;

  const eventsByType = _.groupBy(events, 'type');
  const eventTypes = _.keys(eventsByType);

  const summaryEvents = eventTypes .map(type => {
          return {
            title: summaryLimitEventTitle(type, eventsByType[type].length),
            type
          };
        });

  const eventsRendered = summaryEvents
          .slice(0, eventLimitSize)
          .map((event, index) => renderEvent(event, index, onClickEvent, false));

  const showMoreLink = renderShowMoreLink(summaryEvents, props, 'more types');

  if (showMoreLink) eventsRendered.push(showMoreLink);

  return eventsRendered;
};

const renderEvents = (props, view) => {
  const { eventLimit, ...others } = props;

  let events = [];

  switch (eventLimit) {
    case 'none':
    events = renderEventsWithoutLimit(others);
      break;
    case 'plain':
      events = renderEventsWithPlainLimit(others);
      break;
    case 'summary':
      events = renderEventsWithSummaryLimit(others);
      break;
    default:
      break;
  }

  return events;
};

export default renderEvents;
