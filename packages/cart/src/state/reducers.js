import { actionTypes } from './actions';

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ON_COMMENT_CHANGE:
      return {
        ...state,
        comment: payload,
      };
    case actionTypes.SET_CART_CONFIG:
      return {
        ...state,
        queryVariables: payload.queryVariables,
        table: payload.table,
        manifestFileName: payload.manifestFileName,
        manifestData: payload.manifestData,
      };
    default:
      return state;
  }
};

export default cartReducer;
