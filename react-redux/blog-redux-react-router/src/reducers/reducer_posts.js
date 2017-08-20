import _ from 'lodash';
import { FETCH_POSTS } from '../actions'; // We don't need to specify a file here because we're importing from the index.js file

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_POSTS:      
      return _.mapKeys(action.payload.data, 'id');
      break;
    default:
      return state;
  }
}
