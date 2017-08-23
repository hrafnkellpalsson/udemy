import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'; // We don't need to specify a file here because we're importing from the index.js file

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_POST:
     const post = action.payload.data;
     // ES5 way of doing things
     // const newState = { ...state,  }
     // newState[post.id] = post;
     // return newState;
     // Let's use ES6 for more concise syntax that is equivalent to above commented out code
     return { ...state, [post.id]: post };
     break;
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
      break;
    case DELETE_POST:
      // _.omit return a new object, does not modify the object is acts on.
      return _.omit(state, action.payload);
      break;
    default:
      return state;
  }
}
