import ActionTypes from './actionTypes';

export const Action_1 = (any_Argument) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ACTION_TYPE_1,
      payload: any_Argument,
    });
  };
};

export const Action_2 = (any_Argument) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ACTION_TYPE_2,
      payload: any_Argument,
    });
  };
};
