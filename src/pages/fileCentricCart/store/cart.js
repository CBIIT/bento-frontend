import { useState, useLayoutEffect, useEffect } from 'react';
import store from '../../../store';

// defines the name of the Redux store slice where the list will live
const storeKey = 'cart';

const initialState = {
  subjectIds: [],
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

const shouldInitCart = (state) => state.subjectIds !== JSON.parse(localStorage.getItem('CartSubjectIds'));

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
export const addToCart = (item) => store.dispatch({ type: 'addSubjects', payload: item });

export const deleteFromCart = (item) => store.dispatch({ type: 'deleteSubjects', payload: item });

export const initCart = () => {
// load dashboard data.
  if (shouldInitCart(getState())) {
    return store.dispatch({ type: 'initCart' });
  }
  return store.dispatch({ type: 'readyCart' });
};

export const readyCart = () => store.dispatch({ type: 'readyCart' });

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
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
