/* eslint-env mocha */

import Browser from 'zombie';
import moment from 'moment';
import server from '../dev_server.js';

Browser.localhost('example.com', 3333);

describe('User visits calendar page', () => {
  const browser = new Browser();
  browser.waitFor = 1000;

  before(done => {
    browser.visit('/', done);
  });

  // Month

  describe('views month', () => {
    const monthLabel = moment().format('MMMM YYYY');
    it('should see current month view', () => {
      browser.assert.text('header h2', monthLabel);
      browser.assert.element('.fc-month-view');
    });
  });

  describe('clicks forward', () => {
    const monthLabel = moment().add(1, 'months').format('MMMM YYYY');
    before(done => {
      browser.pressButton('.fwd', done);
    });

    it('should see the next month', () => {
      browser.assert.text('header h2', monthLabel);
      browser.assert.element('.fc-month-view');
    });

    it('should see the correct events', () => {
      // TODO dev_data.json event dates are hardcoded, this will break:
      browser.assert.elements('.fc-event', 8);
    });
  });

  describe('clicks back', () => {
    const monthLabel = moment().format('MMMM YYYY');
    before(done => {
      browser.pressButton('.back', done);
    });

    it('should see the previous month', () => {
      browser.assert.text('header h2', monthLabel);
      browser.assert.element('.fc-month-view');
    });

    it('should see the correct events', () => {
      browser.assert.elements('.fc-event', 7);
    });
  });

  // Week

  describe('switches to week view', () => {
    const dateLabel = moment().format('MMMM YYYY');
    before(done => {
      browser.pressButton('.week', done);
    });

    it('should see the current week', () => {
      browser.assert.text('header h2', dateLabel);
      browser.assert.element('.fc-week-view');
    });

    it('should see the correct events', () => {
      browser.assert.elements('.fc-event', 1);
      browser.assert.text('.fc-event', 'Lucy');
    });
  });

  describe('clicks back', () => {
    const dateLabel = moment().add(-1, 'weeks').format('MMMM YYYY');
    before(done => {
      browser.pressButton('.back', done);
    });

    it('should see the previous week', () => {
      browser.assert.text('header h2', dateLabel);
      browser.assert.element('.fc-week-view');
    });

    it('should see the correct events', () => {
      browser.assert.elements('.fc-event', 1);
      browser.assert.text('.fc-event', 'Eye Exam');
    });
  });

  // Today

  describe('clicks Today', () => {
    const dateLabel = moment().format('MMMM YYYY');
    before(done => {
      browser.pressButton('.today', done);
    });

    it('should see the current month', () => {
      browser.assert.text('header h2', dateLabel);
    });

    it('should see the correct events', () => {
      browser.assert.elements('.fc-event', 1);
      browser.assert.text('.fc-event', 'Lucy');
    });
  });

  // Day

  describe('switches to day view', () => {
    const dateLabel = moment().format('MMMM D, YYYY');
    before(done => {
      browser.pressButton('.day', done);
    });

    it('should see the current day', () => {
      browser.assert.text('header h2', dateLabel);
      browser.assert.element('.fc-day-view');
    });

    it('should see the correct events', () => {
      browser.assert.elements('.fc-event', 0);
    });
  });

  describe('clicks forward', () => {
    const dateLabel = moment().add(1, 'days').format('MMMM D, YYYY');
    before(done => {
      browser.pressButton('.fwd', done);
    });

    it('should see the next day', () => {
      browser.assert.text('header h2', dateLabel);
      browser.assert.element('.fc-day-view');
    });

    it('should see the correct events', () => {
      browser.assert.elements('.fc-event', 1);
      browser.assert.text('.fc-event', 'Lucy');
    });
  });
});
