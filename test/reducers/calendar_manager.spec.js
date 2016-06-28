/* eslint-env mocha */

import assert from 'assert';
import calendarManager from '../../src/reducers/calendar_manager.js';
import moment from 'moment';
import { BACK_IN_DATE, BACK_TO_TODAY, FORWARD_IN_DATE,
         SHOW_DAY_VIEW, SHOW_WEEK_VIEW,
         SHOW_MONTH_VIEW, UPDATE_VIEW, UPDATE_DATE } from '../../src/actions/actions_types';

describe.only('Calendar manager reducer', () => {
  let state = calendarManager(undefined, {});

  it('should return the correct default state', () => {
    assert.equal(state.view, 'month');
    const today = moment();
    assert(today.isSame(state.date, 'day'));
  });

  describe('Month view', () => {
    it('should show month on view action', () => {
      const currentDate = state.date;
      state = calendarManager(state, { type: SHOW_MONTH_VIEW });
      assert.equal(state.view, 'month');
      assert.equal(state.date, currentDate, 'Date should not change');
    });
    it('should update on date action', () => {
      const newDate = moment({ year: 2020, month: 2, day: 3 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });
      assert.equal(state.view, 'month');
      assert(newDate.isSame(state.date, 'day'));
    });
    it('should update month on forward action', () => {
      const newDate = moment({ year: 1996, month: 11, day: 30 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });
      state = calendarManager(state, { type: FORWARD_IN_DATE });
      assert.equal(state.view, 'month');
      assert(moment({ year: 1997, month: 0, day: 30 }).isSame(state.date, 'month'));
    });
    it('should update dates on back action', () => {
      const newDate = moment({ year: 2013, month: 1, day: 15 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });

      // Go back 3 months:
      state = calendarManager(state, { type: BACK_IN_DATE });
      state = calendarManager(state, { type: BACK_IN_DATE });
      state = calendarManager(state, { type: BACK_IN_DATE });
      assert.equal(state.view, 'month');
      newDate.add(-3, 'months');
      assert(newDate.isSame(state.date, 'month'));
    });
    it('should update dates on today action', () => {
      const today = moment();
      state = calendarManager(state, { type: BACK_TO_TODAY });
      assert(today.isSame(state.date, 'month'), 'Not same month as today');
    });
  });

  describe('Week view', () => {
    it('should show week on view action', () => {
      const currentDate = state.date;
      state = calendarManager(state, { type: SHOW_WEEK_VIEW });
      assert.equal(state.view, 'week');
      assert.equal(state.date, currentDate, 'Date should not change');
    });
    it('should update dates on forward action', () => {
      const newDate = moment({ year: 2012, month: 4, day: 7 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });

      // Go forward 1 week:
      state = calendarManager(state, { type: FORWARD_IN_DATE });
      assert.equal(state.view, 'week');
      const nextWeek = moment({ year: 2012, month: 4, day: 14 });
      assert(nextWeek.isSame(state.date, 'week'));
    });
    it('should update dates on back action', () => {
      const newDate = moment({ year: 2015, month: 7, day: 22 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });
      // Go back 3 weeks:
      state = calendarManager(state, { type: BACK_IN_DATE });
      state = calendarManager(state, { type: BACK_IN_DATE });
      state = calendarManager(state, { type: BACK_IN_DATE });
      const threeWeeksBefore = moment({ year: 2015, month: 7, day: 1 });
      assert(threeWeeksBefore.isSame(state.date, 'week'));
    });
  });

  describe('Day view', () => {
    it('should show day on view action', () => {
      const currentDate = state.date;
      state = calendarManager(state, { type: SHOW_DAY_VIEW });
      assert.equal(state.view, 'day');
      assert.equal(state.date, currentDate, 'Date should not change');
    });
    it('should update dates on forward action', () => {
      const newDate = moment({ year: 2012, month: 4, day: 7 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });

      // Go forward 2 days
      state = calendarManager(state, { type: FORWARD_IN_DATE });
      state = calendarManager(state, { type: FORWARD_IN_DATE });
      assert.equal(state.view, 'day');
      const twoDaysLater = moment({ year: 2012, month: 4, day: 9 });
      assert(twoDaysLater.isSame(state.date, 'day'));
    });
    it('should update dates on back action', () => {
      const newDate = moment({ year: 2015, month: 7, day: 22 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });
      // Go back 3 weeks:
      state = calendarManager(state, { type: BACK_IN_DATE });
      const dayBefore = moment({ year: 2015, month: 7, day: 21 });
      assert(dayBefore.isSame(state.date, 'day'));
    });
    it('should return to today on today action', () => {
      const newDate = moment({ year: 1941, month: 11, day: 7 });
      state = calendarManager(state, { type: UPDATE_DATE, newDate });
      // Go back 3 weeks:
      state = calendarManager(state, { type: BACK_TO_TODAY });
      const today = moment();
      assert(today.isSame(state.date, 'day'));
    });
  });
});
