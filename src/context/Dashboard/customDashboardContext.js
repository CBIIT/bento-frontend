/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  DashboardContextProvider,
  storeKey,
  getInitialState,
} from 'bento-components';
import contextProps from './dashboardContextProps';
import CustomDashboardFunctions from './customDashboardFunctions';
import customDashboardReducers from './customDashboardReducers';

// Custom Functions.
const CustomFunctions = new CustomDashboardFunctions(contextProps);
console.log(CustomFunctions.this);
const reducers = customDashboardReducers(contextProps, CustomFunctions);

const CustomDashboardContextProvider = (props) => (
  <>
    <DashboardContextProvider CustomFunctions={CustomFunctions} {...contextProps}>
      {props.children}
    </DashboardContextProvider>
  </>
);

export default CustomDashboardContextProvider;

// Register Reducers
const { store } = contextProps;

const initialState = getInitialState(contextProps);

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
