import {combineReducers} from 'redux';
import ActionTypes from './actionTypes';

let dummyState = {
  dummyState: 'dummyState',
};

const dummyReducer = (state = dummyState, action) => {
  switch (action.type) {
    case ActionTypes.ACTION_TYPE_1:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({dummyReducer});
