import {

} from '../../utils/dashboardUtilFunctions';


export const initialState = {
  cases: [],
  files: [],
  error: '',
  isError: false,
};


export const TOGGLE_CHEKCBOX_IN_CASE_TABLE = 'TOGGLE_CHEKCBOX_IN_CASE_TABLE';
export const INIT_CART = 'INIT_CART';
export const CART_QUERY_ERR = 'CART_QUERY_ERR';
export const READY_CART = 'READY_CART';
export const DELETE_CASES = 'DELETE_CASES';


export const deleteCasesAction = (payload) => ({
  type: DELETE_CASES,
  payload,
});

const deleteCases = (selectedCases, cases) => {
  if (!selectedCases || selectedCases.length === 0) return cases;
  return cases.filter((caseId) => !selectedCases.includes(caseId));
};


export const getCart = () => ({
  type: INIT_CART,
});


const shouldInitCart = (state) => state.cart.cases !== JSON.parse(localStorage.getItem('userSelectedCases'));

const readyCart = () => ({
  type: READY_CART,
});


export function initCart() {
  return (dispatch, getState) => {
    if (shouldInitCart(getState())) {
      return dispatch(getCart());
    }
    return dispatch(readyCart());
  };
}


export const toggleCheckboxInCaseTable = (payload) => ({
  type: TOGGLE_CHEKCBOX_IN_CASE_TABLE,
  payload,
});


export function receiveCases(casesIds) {
  const payload = {
    cases: casesIds,
  };
  return ({
    type: TOGGLE_CHEKCBOX_IN_CASE_TABLE,
    payload,
  });
}


export default function CARTReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_CASES: {
      const casesAfterDeletion = deleteCases(action.payload, state.cases);
      localStorage.setItem('userSelectedCases', JSON.stringify(casesAfterDeletion));
      return {
        ...state,
        cases: casesAfterDeletion,
      };
    }

    case INIT_CART: {
      return {
        ...state,
        isError: false,
        cases: JSON.parse(localStorage.getItem('userSelectedCases')) || [],
      };
    }


    case TOGGLE_CHEKCBOX_IN_CASE_TABLE: {
      const previousStatCases = Object.assign([], state.cases);
      // remove duplicates in case's ids.
      const uniqueCases = action.payload.cases.length > 0
        ? Array.from(
          new Set(
            previousStatCases.concat(action.payload.cases),
          ),
        ) : previousStatCases;

      localStorage.setItem('userSelectedCases', JSON.stringify(uniqueCases) || []);
      return {
        ...state,
        isError: false,
        cases: uniqueCases,
      };
    }
    case CART_QUERY_ERR: {
      return {
        ...state,
        isError: true,
        error: action.payload,
      };
    }

    case READY_CART: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
