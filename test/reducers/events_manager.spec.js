/* eslint-env mocha */

import assert from 'assert';
import moment from 'moment';
import eventsManager from '../../src/reducers/events_manager';
import { INIT_EVENTS, UPDATE_EVENTS, UPDATE_EVENT_SOURCES,
         ADD_EVENT_SOURCES, REMOVE_EVENT_SOURCES, UPDATE_EVENTS_META,
         UPDATE_DISABLED_EVENT_TYPES, ADD_DISABLED_EVENT_TYPES,
         REMOVE_DISABLED_EVENT_TYPES } from '../../src/actions/actions_types';

describe('events manager reducer', () => {
  let state = eventsManager(undefined, {});

  it('should return the correct default state', () => {
    assert.deepEqual(state.events, []);
    assert.deepEqual(state.eventSources, []);
    assert.deepEqual(state.disabledEventTypes, []);
  });

  describe('event sources', () => {
    describe('update', () => {
      it('should update', () => {
        state = eventsManager(state, { type: UPDATE_EVENT_SOURCES,
                                         eventSources: [ '/event_source_1', '/event_source_2' ] });
        assert.deepEqual(state.eventSources, [ '/event_source_1', '/event_source_2' ]);
      });
      it('should ignore', () => {
        state = eventsManager(state, { type: UPDATE_EVENT_SOURCES,
                                         eventSources: '/event_source_1' });
        assert.deepEqual(state.eventSources, [ '/event_source_1', '/event_source_2' ]);
      });
    });

    describe('add', () => {
      it('should add array of event sources', () => {
        state = eventsManager(state, { type: ADD_EVENT_SOURCES,
                                       eventSources: [ '/event_source_3', '/event_source_4' ] });
        assert.deepEqual(state.eventSources,
                         [ '/event_source_1', '/event_source_2', '/event_source_3', '/event_source_4']);
      });
      it('should add event source string', () => {
        state = eventsManager(state, { type: ADD_EVENT_SOURCES,
                                       eventSources: '/event_source_5' });
        assert.deepEqual(state.eventSources,
                         [ '/event_source_1', '/event_source_2', '/event_source_3',
                           '/event_source_4', '/event_source_5']);
      });
      it('should remove duplicates from array of event sources', () => {
        state = eventsManager(state, { type: ADD_EVENT_SOURCES,
                                       eventSources: [ '/event_source_3', '/event_source_4' ] });
        assert.deepEqual(state.eventSources,
                         [ '/event_source_1', '/event_source_2', '/event_source_3',
                           '/event_source_4', '/event_source_5']);
      });
      it('should remove duplicates from event sources string', () => {
        state = eventsManager(state, { type: ADD_EVENT_SOURCES,
                                       eventSources: '/event_source_1' });
        assert.deepEqual(state.eventSources,
                         [ '/event_source_1', '/event_source_2', '/event_source_3',
                           '/event_source_4', '/event_source_5']);
      });
    });
    describe('remove', () => {
      it('should remove array of event sources', () => {
        state = eventsManager(state, { type: REMOVE_EVENT_SOURCES,
                                       eventSources: [ '/event_source_3', '/event_source_4',
                                                       '/event_source_6'] });
        assert.deepEqual(state.eventSources,
                         [ '/event_source_1', '/event_source_2', '/event_source_5' ]);
      });
      it('should remove event source string', () => {
        state = eventsManager(state, { type: REMOVE_EVENT_SOURCES,
                                       eventSources: '/event_source_5' });
        assert.deepEqual(state.eventSources,
                         [ '/event_source_1', '/event_source_2' ]);
      });
    });
  });

  describe('events', () => {
    describe('init', () => {
      it('starts first fetch', () => {
        const date = moment().add(10, 'year');
        state = eventsManager(state, { type: INIT_EVENTS, events: [ { id: 1, title: 'event1' },
                                                                    { id: 1, title: 'event2' } ],
                                       firstFetch: true, newStart: date.clone(), newEnd: date.clone() });

        assert.deepEqual(state.events, [ { id: 1, title: 'event1' } ]);
        assert(!date.isSame(state.eventsMetaData.cachedStart), 'first fetch should not update cachedStart');
        assert(!date.isSame(state.eventsMetaData.cachedEnd), 'first fetch should not update cachedEnd');
      });
      it('starts last fetch', () => {
        const date = moment().add(10, 'year');
        state = eventsManager(state, { type: INIT_EVENTS, events: [ { id: 2, title: 'event2' } ],
                                       lastFetch: true, newStart: date.clone(), newEnd: date.clone() });

        assert.deepEqual(state.events, [ { id: 1, title: 'event1' }, { id: 2, title: 'event2' }]);
        assert(date.isSame(state.eventsMetaData.cachedStart), 'last fetch should update cachedStart');
        assert(date.isSame(state.eventsMetaData.cachedEnd), 'last fetch should update cachedEnd');
      });
      it('starts first fetch upon re-initialization', () => {
        const date = moment().add(10, 'year');
        state = eventsManager(state, { type: INIT_EVENTS, events: [ { id: 1, title: 'event1' },
                                                                    { id: 1, title: 'event2' } ],
                                       firstFetch: true, newStart: date.clone(), newEnd: date.clone() });

        assert.deepEqual(state.events, [ { id: 1, title: 'event1' } ]);
      });
    });
    describe('update', () => {
      it('starts first fetch', () => {
        const date = moment().add(20, 'year');
        state = eventsManager(state, { type: UPDATE_EVENTS, events: [ { id: 2, title: 'event2' },
                                                                    { id: 3, title: 'event3' } ],
                                       firstFetch: true, newStart: date.clone(), newEnd: date.clone() });

        assert.deepEqual(state.events, [ { id: 1, title: 'event1' },
                                         { id: 2, title: 'event2' },
                                         { id: 3, title: 'event3' }
                                       ]);
        assert(!date.isSame(state.eventsMetaData.cachedStart), 'first fetch should not update cachedStart');
        assert(!date.isSame(state.eventsMetaData.cachedEnd), 'first fetch should not update cachedEnd');
      });
      it('starts last fetch', () => {
        const date = moment().add(20, 'year');
        state = eventsManager(state, { type: UPDATE_EVENTS, events: [ { id: 4, title: 'event4' } ],
                                       lastFetch: true, newStart: date.clone(), newEnd: date.clone() });

        assert.deepEqual(state.events, [ { id: 1, title: 'event1' },
                                         { id: 2, title: 'event2' },
                                         { id: 3, title: 'event3' },
                                         { id: 4, title: 'event4' }
                                       ]);
        assert(date.isSame(state.eventsMetaData.cachedStart), 'last fetch should update cachedStart');
        assert(date.isSame(state.eventsMetaData.cachedEnd), 'last fetch should update cachedEnd');
      });
    });
  });
  describe('events meta data', () => {
    it('updates', () => {
      const newDateFormatter = 'MM/DD/YYYY';
      state = eventsManager(state, { type: UPDATE_EVENTS_META,
                                     metaShouldUpdate: { dateFormatter: newDateFormatter }
                                   });

      assert.deepEqual(state.eventsMetaData.dateFormatter, newDateFormatter);
    });
  });
  describe('disabled event types', () => {
    describe('update', () => {
      it('should update', () => {
        state = eventsManager(state, { type: UPDATE_DISABLED_EVENT_TYPES,
                                         eventTypes: [ 'event_type_1', 'event_type_2' ] });
        assert.deepEqual(state.disabledEventTypes, [ 'event_type_1', 'event_type_2' ]);
      });
      it('should ignore', () => {
        state = eventsManager(state, { type: UPDATE_DISABLED_EVENT_TYPES,
                                         eventTypes: 'event_type_1' });
        assert.deepEqual(state.disabledEventTypes, [ 'event_type_1', 'event_type_2' ]);
      });
    });

    describe('add', () => {
      it('should add array of event types', () => {
        state = eventsManager(state, { type: ADD_DISABLED_EVENT_TYPES,
                                       eventTypes: [ 'event_type_3', 'event_type_4' ] });
        assert.deepEqual(state.disabledEventTypes,
                         [ 'event_type_1', 'event_type_2', 'event_type_3', 'event_type_4']);
      });
      it('should add event type string', () => {
        state = eventsManager(state, { type: ADD_DISABLED_EVENT_TYPES,
                                       eventTypes: 'event_type_5' });
        assert.deepEqual(state.disabledEventTypes,
                         [ 'event_type_1', 'event_type_2', 'event_type_3',
                           'event_type_4', 'event_type_5']);
      });
      it('should remove duplicates from array of event types', () => {
        state = eventsManager(state, { type: ADD_DISABLED_EVENT_TYPES,
                                       eventTypes: [ 'event_type_3', 'event_type_4' ] });
        assert.deepEqual(state.disabledEventTypes,
                         [ 'event_type_1', 'event_type_2', 'event_type_3',
                           'event_type_4', 'event_type_5']);
      });
      it('should remove duplicates from event type string', () => {
        state = eventsManager(state, { type: ADD_DISABLED_EVENT_TYPES,
                                       eventTypes: 'event_type_1' });
        assert.deepEqual(state.disabledEventTypes,
                         [ 'event_type_1', 'event_type_2', 'event_type_3',
                           'event_type_4', 'event_type_5']);
      });
    });
    describe('remove', () => {
      it('should remove array of event types', () => {
        state = eventsManager(state, { type: REMOVE_DISABLED_EVENT_TYPES,
                                       eventTypes: [ 'event_type_3', 'event_type_4',
                                                       'event_type_6'] });
        assert.deepEqual(state.disabledEventTypes,
                         [ 'event_type_1', 'event_type_2', 'event_type_5' ]);
      });
      it('should remove event type string', () => {
        state = eventsManager(state, { type: REMOVE_DISABLED_EVENT_TYPES,
                                       eventTypes: 'event_type_5' });
        assert.deepEqual(state.disabledEventTypes,
                         [ 'event_type_1', 'event_type_2' ]);
      });
    });
  });
});
