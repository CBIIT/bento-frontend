export const actionTypes = {
  INIT_CART: 'INIT_CART',
  ADD_CART_FILES: 'ADD_CART_FILES',
  DELETE_CART_FILES: 'DELETE_CART_FILES',
};

export const initCart = () => ({
  type: actionTypes.INIT_CART,
});

export const onAddCartFiles = (files) => ({
  type: actionTypes.ADD_CART_FILES,
  payload: files,
});

export const onDeleteCartFiles = (files) => ({
  type: actionTypes.REMOVE_CART_FILES,
  payload: files,
});
