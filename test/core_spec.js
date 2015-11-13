import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Transp', '12 hours');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Transp', '12 hours')
      }))
    })

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Barcelona', 'Vacations'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Barcelona', 'Vacations')
      }))
    })
  })

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Barcelona', 'Vacations', 'Awesome')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Barcelona', 'Vacations')
        }),
        entries: List.of('Awesome')
      }));
    })
  })

  describe('vote', () => {
    it('creates a tally from the voted entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Barcelona', 'Vacations']
        },
        entries: []
      });
      const nextState = vote(state, 'Barcelona');
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Barcelona', 'Vacations'],
          tally: {
            'Barcelona': 1
          }
        },
        entries: []
      }));
    });

    it('adds to existing tally from the voted entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Barcelona', 'Vacations'],
          tally: {
            'Barcelona': 3,
            'Vacations': 2
          }
        },
        entries: []
      });
      const nextState = vote(state, 'Barcelona');
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Barcelona', 'Vacations'],
          tally: {
            'Barcelona': 4,
            'Vacations': 2
          }
        },
        entries: []
      }));
    });
  })
})
