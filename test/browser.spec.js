/* eslint-env mocha */

import assert from 'assert';
import moment from 'moment';
import Nightmare from 'nightmare';
import server from '../dev_server.js';
import _ from 'lodash';

describe('User visits calendar page', () => {
  const browser = (new Nightmare()).goto('http://localhost:3333');

  // Month

  describe('views month', () => {
    const monthLabel = moment().format('MMMM YYYY');
    it('should default to month view', () => {
      return browser
        .visible('.fc-month-view')
        .then(visible => assert(visible, 'month view is not visible'));
    });

    it('should show the current month', () => {
      return browser
        .evaluate(() => document.querySelector('header h2').innerText)
        .then(text => assert.equal(text, monthLabel));
    });

    it('should see the correct events', () => {
      return browser
        .evaluate(() => document.querySelectorAll('.fc-event'))
        .then(events => assert.equal(_.size(events), 16));
    });

    describe('clicks forward', () => {
      const monthLabel = moment().add(1, 'months').format('MMMM YYYY');

      it('should see the next month', () => {
        return browser
          .click('.fwd')
          .evaluate(() => document.querySelector('header h2').innerText)
          .then(text => assert.equal(text, monthLabel));
      });

      it('should see the correct events', () => {
        return browser
          .evaluate(() => document.querySelectorAll('.fc-event'))
          .then(events => assert.equal(_.size(events), 6));
      });
    });

    describe('clicks back', () => {
      const monthLabel = moment().format('MMMM YYYY');

      it('should see the previous month', () => {
        return browser
          .click('.back')
          .evaluate(() => document.querySelector('header h2').innerText)
          .then(text => assert.equal(text, monthLabel));
      });

      it('should see the correct events', () => {
        return browser
          .evaluate(() => document.querySelectorAll('.fc-event'))
          .then(events => assert.equal(_.size(events), 16));
      });
    });
  });

  // Week

  describe('switches to week view', () => {
    const dateLabel = moment().format('MMMM YYYY');

    it('should switch to week view', () => {
      return browser
        .click('.week')
        .visible('.fc-week-view')
        .then(visible => assert(visible, 'week view is not visible'));
    });

    it('should see the current week', () => {
      return browser
        .click('.week')
        .evaluate(() => document.querySelector('header h2').innerText)
        .then(text => assert.equal(text, dateLabel));
    });

    describe('clicks back', () => {
      const dateLabel = moment().add(-1, 'weeks').format('MMMM YYYY');

      it('should see the previous week', () => {
        return browser
          .click('.back')
          .evaluate(() => document.querySelector('header h2').innerText)
          .then(text => assert.equal(text, dateLabel));
      });
    });

    describe('clicks Today', () => {
      const dateLabel = moment().format('MMMM YYYY');

      it('should see the current month', () => {
        return browser
          .click('.today')
          .evaluate(() => document.querySelector('header h2').innerText)
          .then(text => assert.equal(text, dateLabel));
      });
    });
  });

  // Day

  describe('switches to day view', () => {
    const dateLabel = moment().format('MMMM D, YYYY');

    it('should switch to day view', () => {
      return browser
        .click('.day')
        .visible('.fc-day-view')
        .then(visible => assert(visible, 'day view is not visible'));
    });

    it('should see the current day', () => {
      return browser
        .evaluate(() => document.querySelector('header h2').innerText)
        .then(text => assert.equal(text, dateLabel));
    });

    describe('clicks forward', () => {
      const dateLabel = moment().add(1, 'days').format('MMMM D, YYYY');

      it('should see the next day', () => {
        return browser
          .click('.fwd')
          .evaluate(() => document.querySelector('header h2').innerText)
          .then(text => assert.equal(text, dateLabel));
      });
    });

    describe('clicks Today', () => {
      const dateLabel = moment().format('MMMM D, YYYY');

      it('should see the current day', () => {
        return browser
          .click('.today')
          .evaluate(() => document.querySelector('header h2').innerText)
          .then(text => assert.equal(text, dateLabel));
      });
    });
  });
});
