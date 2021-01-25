import ActionTypes from './actionTypes';

export const setUserOrderAction = (userOrder) => {
  console.log(userOrder);
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_ORDER,
      payload: userOrder,
    });
  };
};
