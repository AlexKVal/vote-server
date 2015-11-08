import {expect} from 'chai';
import {List, Map} from 'immutable';

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

  describe('a List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Garry', '28hrs');
      let nextState = addMovie(state, 'Sun');

      expect(nextState).to.equal(List.of('Garry', '28hrs', 'Sun'));

      expect(state).to.equal(List.of('Garry', '28hrs'));
    })
  })

  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      )
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Garry', '28hrs')
      });
      let nextState = addMovie(state, 'Sun');

      expect(nextState).to.equal(Map({
        movies: List.of('Garry', '28hrs', 'Sun')
      }));

      // assert that 'state' has not been mutated
      expect(state).to.equal(Map({
        movies: List.of('Garry', '28hrs')
      }))
    })
  })
})
