import {combineReducers} from 'redux';
import ActionTypes from './actionTypes';

let UserOrder = {};

const UserOrderReducer = (state = UserOrder, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_ORDER:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({UserOrderReducer});
