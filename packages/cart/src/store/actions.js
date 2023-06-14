export const actionTypes = {
  INIT_CART: 'INIT_CART',
  ADD_CART_FILES: 'ADD_CART_FILES',
  DELETE_CART_FILE: 'DELETE_CART_FILE',
  DELETE_ALL_CART_FILES: 'DELETE_ALL_CART_FILES',
};

export const initCart = () => ({
  type: actionTypes.INIT_CART,
});

export const onAddCartFiles = (files) => ({
  type: actionTypes.ADD_CART_FILES,
  payload: files,
});

export const onDeleteCartFile = (fileId) => ({
  type: actionTypes.DELETE_CART_FILE,
  payload: fileId,
});

export const onDeleteAllCartFile = () => ({
  type: actionTypes.DELETE_ALL_CART_FILES,
});
