export const actionTypes = {
  ON_COMMENT_CHANGE: 'ON_COMMENT_CHANGE',
  SET_CART_CONFIG: 'SET_CART_CONFIG',
};

export const onCommentChange = (text) => ({
  type: actionTypes.ON_COMMENT_CHANGE,
  payload: text,
});

export const setCartConfig = (config) => ({
  type: actionTypes.SET_CART_CONFIG,
  payload: config,
});
