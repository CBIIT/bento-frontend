import { useState, useLayoutEffect, useEffect } from 'react';
import store from '../../../store';
import { maximumNumberOfFilesAllowedInTheCart } from '../../../bento/fileCentricCartWorkflowData';

// defines the name of the Redux store slice where the list will live
const storeKey = 'cart';

const initialState = {
  fileIds: [],
  sortColumn: '',
  sortDirection: '',
  error: '',
  isError: false,
};

// utils

// remove given ids from list of ids
// @inputtargetIds [id] , existingIds [id]
// @output ids [id]
const filterOutIDs = (targetIds, existingIds) => {
  if (!targetIds || targetIds.length === 0) return existingIds;
  return existingIds.filter((id) => !targetIds.includes(id));
};

const shouldInitCart = (state) => state.fileIds !== JSON.parse(localStorage.getItem('CartFileIds'));

// HELPERS
const getState = () => store.getState()[storeKey];

/* eslint-disable no-return-assign */
const subscribe = (f) => {
  let lastState = getState();
  return store.subscribe(
    () => lastState !== getState() && f((lastState = getState())),
  );
};
/* eslint-disable no-return-assign */

// actions
export const addToCart = (item) => store.dispatch({ type: 'addFiles', payload: item });

export const deleteFromCart = (item) => store.dispatch({ type: 'deleteFiles', payload: item });

export const updateSortOrder = (newSortOrder) => {
  localStorage.setItem('sortColumn', newSortOrder.sortColumn);
  localStorage.setItem('sortDirection', newSortOrder.sortDirection);
};

export const initCart = () => {
// load dashboard data.
  if (shouldInitCart(getState())) {
    return store.dispatch({ type: 'initCart' });
  }
  return store.dispatch({ type: 'readyCart' });
};

export const readyCart = () => store.dispatch({ type: 'readyCart' });

export const cartWillFull = (numberOfFilesSelected) => numberOfFilesSelected
+ getState().fileIds.length
> maximumNumberOfFilesAllowedInTheCart;

export const getCart = () => {
  // make sure the redux store is sync with localstorage.
  useEffect(() => {
    initCart();
  }, []);
  // subscribe to the the store. listen for the changes.
  const [state, setState] = useState(getState());
  useLayoutEffect(() => subscribe(setState), [setState]);
  return state;
};

export const getFilesIdsInCart = () => getState().fileIds;

// reducers
const reducers = {
  addFiles: (state, item) => {
    // get previous subject's id
    const previousFileIds = Object.assign([], state.fileIds);

    // remove duplicated subject's id
    const uniqueFileIds = item.fileIds.length > 0
      ? Array.from(
        new Set(
          previousFileIds.concat(item.fileIds),
        ),
      ) : previousFileIds;

    // store ids in the localstorage.
    localStorage.setItem('CartFileIds', JSON.stringify(uniqueFileIds) || []);
    return {
      ...state,
      fileIds: uniqueFileIds,
      sortColumn: localStorage.getItem('sortColumn'),
      sortDirection: localStorage.getItem('sortDirection'),
    };
  },
  deleteFiles: (state, item) => {
    const fileIdsAfterDeletion = filterOutIDs(item.fileIds, state.fileIds);
    localStorage.setItem('CartFileIds', JSON.stringify(fileIdsAfterDeletion));
    let sortColumnValue = localStorage.getItem('sortColumn');
    let sortDirectionValue = localStorage.getItem('sortDirection');
    // if all ids get removed, reset the sortorder value back to default
    if (fileIdsAfterDeletion.length === 0) {
      sortColumnValue = '';
      sortDirectionValue = '';
      localStorage.setItem('sortColumn', sortColumnValue);
      localStorage.setItem('sortDirection', sortDirectionValue);
      return {
        ...state,
        fileIds: fileIdsAfterDeletion,
        sortColumn: sortColumnValue,
        sortDirection: sortDirectionValue,
      };
    }
    return {
      ...state,
      fileIds: fileIdsAfterDeletion,
      sortColumn: sortColumnValue,
      sortDirection: sortDirectionValue,
    };
  },
  initCart: (state) => ({
    ...state,
    fileIds: JSON.parse(localStorage.getItem('CartFileIds')) || [],
    sortColumn: localStorage.getItem('sortColumn'),
    sortDirection: localStorage.getItem('sortDirection'),
  }),
  readyCart: (state) => state,
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
