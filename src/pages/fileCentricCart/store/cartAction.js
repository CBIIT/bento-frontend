import { fetchDataForDashboardDataTable } from '../../dashboard/dashboardState';

export const ADD_SUBJECTS = 'ADD_SUBJECTS';
export const INIT_CART = 'INIT_CART';
export const READY_CART = 'READY_CART';
export const DELETE_SUBJECTS = 'DELETE_SUBJECTS';

export const addSubjects = (payload) => ({
  type: ADD_SUBJECTS,
  payload,
});

export const deleteSubjects = (payload) => ({
  type: DELETE_SUBJECTS,
  payload,
});

const getCart = () => ({
  type: INIT_CART,
});

const readyCart = () => ({
  type: READY_CART,
});

const shouldInitCart = (state) => state.cart.subjectIds !== JSON.parse(localStorage.getItem('CartSubjectIds'));

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
