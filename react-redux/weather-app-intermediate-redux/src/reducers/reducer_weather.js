import { FETCH_WEATHER } from '../actions/index';

// The first argument to a reducer is the particular piece of state this reducer is responsible for.
export default function(state=[], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // return state.push(action.payload.data); // BAD!!! Do not mutate state, we must always create a new fresh state
      // return [action.payload.data].concat(state); // This works since concat doesn't mutate the array it operates on, rather it
      // returns a new array. But we can use new fancy ES6 syntax...see below :)
      return [ action.payload.data, ...state];
  }
  return state;
}
