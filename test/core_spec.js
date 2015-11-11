import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

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
})
