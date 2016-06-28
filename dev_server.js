'use strict';

let express = require('express');
let logger = require('morgan');

let app = new express();

// ## Middleware

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));

// Dev middleware:

let webpack = require('webpack');
let config = require('./webpack.dev.config.js');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');

let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// Mock APIs
let _ = require('lodash');
let moment = require('moment');
let data = require('./dev_data.json');

// Calculates event date based on an offset, so that we can test easier.
data.map(event => {
  event.date = moment()
                .date(event.date.day)
                .add(event.date.month, 'months')
                .format('YYYY-MM-DD');
  delete event.offset;
  return event;
})

function getEvents(start, end, type) {
  var events = data;
  if (type) {
    events = _.filter(events, { type: type });
  }
  if (start && end) {
    events = _.filter(events, event => {
      return event.date >= start && event.date <= end;
    });
  }
  return events;
}

function getEvent(id) {
  return _.find(data, { id: id });
}

// List all events for user
app.get('/calendar/events', (req, resp) => {
  let start = req.query.start;
  let end = req.query.end;

  let events = getEvents(start, end);
  resp.json(events);
});

// List all events of type for user
app.get('/calendar/events/:type', (req, resp) => {
  let type = req.params.type;
  let start = req.query.start;
  let end = req.query.end;

  let events = getEvents(start, end, type);

  resp.json(events);
});

// Get a single event
app.get('/events/:id', (req, resp) => {
  let id = req.params.id;

  let event = getEvent(id);
  resp.json(event);
});

let port = 3333 || process.env.port;
app.listen(port, err => console.log(`Listening on ${port}`));
