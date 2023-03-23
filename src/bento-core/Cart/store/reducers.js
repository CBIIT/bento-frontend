import { actionTypes } from './actions';

/**
* initialize cart state
*/
const initCartState = () => {
  const initState = {};
  initState.filesId = JSON.parse(localStorage.getItem('CartFileIds')) || [];
  return initState;
};

export const filterOutIDs = (targetIds, existingIds) => {
  if (!targetIds || targetIds.length === 0) return existingIds;
  return existingIds.filter((id) => !targetIds.includes(id));
};

const addFilesToCart = (state, payload) => {
  const distinctIds = filterOutIDs(state.filesId, payload) || [];
  return {
    filesId: [...state.filesId, ...distinctIds],
    count: distinctIds.length,
  };
};

export const cartReducer = (state = initCartState(), action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.ADD_CART_FILES:
      return {
        ...state,
        ...addFilesToCart(state, payload),
      };
    case actionTypes.DELETE_CART_FILES:
      return {
        ...state,
        deleteFileIds: payload || [],
      };
    default:
      return state;
  }
};

export function cartReducerGenerator() {
  return {
    actionTypes,
    cartReducer,
  };
}
