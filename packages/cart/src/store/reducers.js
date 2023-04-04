import { actionTypes } from './actions';

/**
* initialize cart state
* 1. files ids in cart are stored on localstore
* 2. clear cache will remove all the files from cart
*/
const initCartState = () => {
  if (localStorage.getItem('CartFileIds')) {
    const initState = {};
    initState.filesId = JSON.parse(localStorage.getItem('CartFileIds')) || [];
    return initState;
  }
  return {
    filesId: [],
  };
};

export const filterOutIDs = (targetIds = [], existingIds = []) => {
  if (!targetIds || targetIds.length === 0) return existingIds;
  return existingIds.filter((id) => !targetIds.includes(id));
};

const addFilesToCart = (state, payload = []) => {
  const distinctIds = filterOutIDs(state.filesId, payload) || [];
  // remove duplicated subject's id
  const uniqueFileIds = payload.length > 0
    ? Array.from(
      new Set(
        state.filesId.concat(payload),
      ),
    ) : state.filesId;
  localStorage.setItem('CartFileIds', JSON.stringify(uniqueFileIds) || []);
  return {
    filesId: [...uniqueFileIds],
    count: distinctIds.length,
  };
};

const getFilesAfterDel = (state, payload) => {
  const { filesId } = state;
  const fileIdsAfterDeletion = filesId.filter((file) => file !== payload);
  localStorage.setItem('CartFileIds', JSON.stringify(fileIdsAfterDeletion));
  return {
    filesId: fileIdsAfterDeletion,
    count: fileIdsAfterDeletion.length,
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
    case actionTypes.DELETE_CART_FILE:
      return {
        ...state,
        ...getFilesAfterDel(state, payload),
      };
    case actionTypes.DELETE_ALL_CART_FILES:
      // clear all local storage if we remove all record
      localStorage.clear();
      return {
        ...state,
        filesId: [],
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
