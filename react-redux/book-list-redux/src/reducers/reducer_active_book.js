// state argument is not application state, only the state this reducer is responsible for
// Redux doesn't allow us to return undefined from a reducer, that will throw an error. null however, is ok.
export default function(state = null, action) {
  // Never mutate state. Must return a 100% fresh new state. So don't do something like
  // state.title = action.payload.title;
  // return title;
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
  }

  return state;
}
