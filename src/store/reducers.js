import {combineReducers} from 'redux';
import ActionTypes from './actionTypes';

let UserOrder = {
  Date: '',
  Time: '',
  Rooms: '',
  ServiceName: '',
};

let UserInfo = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

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

const UserInfoReducer = (state = UserInfo, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_INFO:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({UserOrderReducer, UserInfoReducer});
