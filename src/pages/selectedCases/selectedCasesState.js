import client from '../../utils/graphqlClient';
import { GET_MY_CASES_DATA_QUERY } from '../../utils/graphqlQueries';
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
export const DELETE_FILES = 'DELETE_FILES';


export const deleteCasesAction = (payload) => ({
  type: DELETE_CASES,
  payload,
});

const deleteCases = (selectedCases, cases) => {
  if (!selectedCases || selectedCases.length === 0) return cases;

  return cases.filter((caseDetail) => !selectedCases.includes(caseDetail.case_id));
};


const deleteFiles = (selectedCases, files) => {
  if (!selectedCases || selectedCases.length === 0) return files;
  return files.filter((filesDetail) => !selectedCases.includes(filesDetail.case_id));
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


function receiveNewCasesAndFiles(result) {
  const payload = {
    cases: result.data.casesInList,
    files: result.data.filesOfCases,
  };
  return ({
    type: TOGGLE_CHEKCBOX_IN_CASE_TABLE,
    payload,
  });
}


function errorCARThandler(error) {
  return ({
    type: CART_QUERY_ERR,
    error,
  });
}


export function fetchCasesAndFiles(userSelectedCases) {
  return (dispatch) => client
    .query({
      query: GET_MY_CASES_DATA_QUERY,
      variables: { caseIds: userSelectedCases },
    })
    .then((result) => dispatch(receiveNewCasesAndFiles(result)))
    .catch((error) => dispatch(errorCARThandler(error)));
}


export default function CARTReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_CASES: {
      const casesAfterDelete = deleteCases(action.payload, state.cases);
      const filesAfterDelete = deleteFiles(action.payload, state.files);
      localStorage.setItem('userSelectedCases', JSON.stringify(casesAfterDelete));
      localStorage.setItem('userSelectedFiles', JSON.stringify(filesAfterDelete));
      return {
        ...state,
        cases: casesAfterDelete,
        files: filesAfterDelete,
      };
    }

    case INIT_CART: {
      return {
        ...state,
        isError: false,
        cases: JSON.parse(localStorage.getItem('userSelectedCases')),
        files: JSON.parse(localStorage.getItem('userSelectedFiles')),
      };
    }


    case TOGGLE_CHEKCBOX_IN_CASE_TABLE: {
      const previousStatCases = Object.assign([], state.cases);
      const previousStatFiles = Object.assign([], state.files);
      const uniqueCases = action.payload.cases.length > 0
        ? Array.from(
          new Set(
            previousStatCases.concat(action.payload.cases)
              .map((c) => c.case_id),
          ),
        ).map((id) => previousStatCases.concat(action.payload.cases)
          .find((c) => c.case_id === id)) : previousStatCases;
      const uniqueFiles = action.payload.files.length > 0
        ? Array.from(
          new Set(
            previousStatFiles.concat(action.payload.files)
              .map((c) => c.uuid),
          ),
        ).map((id) => previousStatFiles.concat(action.payload.files)
          .find((c) => c.uuid === id)) : previousStatFiles;

      localStorage.setItem('userSelectedCases', JSON.stringify(uniqueCases));
      localStorage.setItem('userSelectedFiles', JSON.stringify(uniqueFiles));
      return {
        ...state,
        isError: false,
        cases: uniqueCases,
        files: uniqueFiles,
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
