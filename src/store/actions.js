import ActionTypes from './actionTypes';

export const setUserOrderAction = (userOrder) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_ORDER,
      payload: userOrder,
    });
  };
};

export const setUserInfoAction = (userInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};
