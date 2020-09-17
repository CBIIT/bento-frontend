import { fetchDataForDashboardDataTable } from '../../dashboard/dashboardState';

export const ADD_FILES = 'ADD_FILES';
export const INIT_CART = 'INIT_CART';
export const READY_CART = 'READY_CART';
export const DELETE_FILES = 'DELETE_CASES';

export const addFiles = (payload) => ({
  type: ADD_FILES,
  payload,
});

export const deleteFiles = (payload) => ({
  type: DELETE_FILES,
  payload,
});

const getCart = () => ({
  type: INIT_CART,
});

const readyCart = () => ({
  type: READY_CART,
});

const shouldInitCart = (state) => state.cart.files !== JSON.parse(localStorage.getItem('cartFiles'));

export function initCart() {
  return (dispatch, getState) => {
    // load dashboard data.
    dispatch(fetchDataForDashboardDataTable());
    if (shouldInitCart(getState())) {
      return dispatch(getCart());
    }
    return dispatch(readyCart());
  };
}
