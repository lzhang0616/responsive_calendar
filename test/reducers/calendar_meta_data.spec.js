/* eslint-env mocha */

import assert from 'assert';
import calendarMetaData from '../../src/reducers/calendar_meta_data';
import { UPDATE_CALENDAR_META } from '../../src/actions/actions_types';

describe('Calendar manager reducer', () => {
  let state = calendarMetaData(undefined, {});

  it('should return the correct default state', () => {
    assert.equal(state.dayViewEventLimit, 'none');
    assert.equal(state.weekViewEventLimit, 'none');
    assert.equal(state.monthViewEventLimit, 'none');

    assert.equal(state.dayViewEventLimitSize, 3);
    assert.equal(state.weekViewEventLimitSize, 3);
    assert.equal(state.monthViewEventLimitSize, 3);
  });

  it('should update', () => {
    const expectedState = {
      dayViewEventLimit: 'summary',
      weekViewEventLimit: 'none',
      monthViewEventLimit: 'none',
      dayViewEventLimitSize: 3,
      weekViewEventLimitSize: 3,
      monthViewEventLimitSize: 3,
      eventLimitClick: 'day'
    };

    state = calendarMetaData(state, { type: UPDATE_CALENDAR_META, calendarMeta: { dayViewEventLimit: 'summary' } });

    assert.deepEqual(state, expectedState);
  });
});
