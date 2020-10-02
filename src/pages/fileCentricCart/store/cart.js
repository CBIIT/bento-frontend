/* eslint-disable */
import store from '../../../store';
import { fetchDataForDashboardDataTable } from '../../dashboard/dashboardState';

// defines the name of the Redux store slice where the list will live
const storeKey = 'cart';

export const initialState = {
  subjectIds: [],
  error: '',
  isError: false,
};

// utils

// remove given ids from list of ids
// @input  targetIds [id] , existingIds [id]
// @output ids [id]
const filterOutIDs = (targetIds, existingIds) => {
  if (!targetIds || targetIds.length === 0) return existingIds;
  return existingIds.filter((id) => !targetIds.includes(id));
};

const shouldInitCart = (state) => state.subjectIds !== JSON.parse(localStorage.getItem('CartSubjectIds'));

// HELPERS
export const getCart = () => store.getState()[storeKey];

// actions
export const addToCart = (item) => store.dispatch({ type: 'addSubjects', payload: item });

export const deleteFromCart = (item) => store.dispatch({ type: 'deleteSubjects', payload: item });

export const initCart = () => {
  // load dashboard data.
  store.dispatch(fetchDataForDashboardDataTable());
  if (shouldInitCart(getCart())) {
    return store.dispatch({ type: 'initCart' });
  }
  return store.dispatch({ type: 'readyCart' });
};

export const readyCart = () => store.dispatch({ type: 'readyCart' });

// reducers
const reducers = {
  addSubjects: (state, item) => {
  	 // get previous subject's id
  	 const previousSubjectIds = Object.assign([], state.subjectIds);

  	 // remove duplicated subject's id
    const uniqueSubjectIds = item.subjectIds.length > 0
      ? Array.from(
        new Set(
          previousSubjectIds.concat(item.subjectIds),
        ),
      ) : previousSubjectIds;

    // store ids in the localstorage.
    localStorage.setItem('CartSubjectIds', JSON.stringify(uniqueSubjectIds) || []);

    return {
      ...state,
      subjectIds: uniqueSubjectIds,
    };
  },
  deleteSubjects: (state, item) => {
  	 const subjectIdsAfterDeletion = filterOutIDs(item.subjectIds, state.subjectIds);
    localStorage.setItem('CartSubjectIds', JSON.stringify(subjectIdsAfterDeletion));
    return {
      ...state,
      subjectIds: subjectIdsAfterDeletion,
    };
  },
  initCart: (state) => ({
    ...state,
    subjectIds: JSON.parse(localStorage.getItem('CartSubjectIds')) || [],
  }),
  readyCart: (state) => state,
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
);