import {expect} from 'chai';

describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      let newState = currentState + 1;
      return newState;
    }

    it('is immutable', () => {
      let state = 3;
      let nextState = increment(state);

      expect(nextState).to.equal(4);
      expect(state).to.equal(3); // immutability
    })
  })
})
