/* eslint-env mocha */

import Browser from 'zombie';
import moment from 'moment';

Browser.localhost('example.com', 3333);

describe('User visits calendar page', () => {
  const browser = new Browser();

  before(done => {
    browser.visit('/', done);
  });

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
  });
});
