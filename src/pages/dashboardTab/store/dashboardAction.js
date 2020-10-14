import _ from 'lodash';
import client from '../../../utils/graphqlClient';
import { DASHBOARD_QUERY } from '../utils/graphqlQueries';

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const RECEIVE_DASHBOARDTAB = 'RECEIVE_DASHBOARDTAB';
export const DASHBOARDTAB_QUERY_ERR = 'DASHBOARDTAB_QUERY_ERR';
export const READY_DASHBOARDTAB = 'READY_DASHBOARDTAB';
export const REQUEST_DASHBOARDTAB = 'REQUEST_DASHBOARDTAB';
export const SINGLE_CHECKBOX = 'SINGLE_CHECKBOX';

export const toggleCheckBox = (payload) => ({
  type: TOGGLE_CHECKBOX,
  payload,
});

export const singleCheckBox = (payload) => ({
  type: SINGLE_CHECKBOX,
  payload,
});

function shouldFetchDataForDashboardTabDataTable(state) {
  return !(state.dashboard.isFetched);
}

function postRequestFetchDataDashboardTab() {
  return {
    type: REQUEST_DASHBOARDTAB,
  };
}

function receiveDashboardTab(json) {
  return {
    type: RECEIVE_DASHBOARDTAB,
    payload:
    {
      data: json.data,
    },
  };
}

function dashboardTaberrorHandler(error, type) {
  return {
    type,
    error,
  };
}

function readyDashboardTab() {
  return {
    type: READY_DASHBOARDTAB,
  };
}

function fetchDashboardTab() {
  return (dispatch) => {
    dispatch(postRequestFetchDataDashboardTab());
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => dispatch(receiveDashboardTab(_.cloneDeep(result))))
      .catch((error) => dispatch(dashboardTaberrorHandler(error, DASHBOARDTAB_QUERY_ERR)));
  };
}

export function fetchDataForDashboardTabDataTable() {
  return (dispatch, getState) => {
    if (shouldFetchDataForDashboardTabDataTable(getState())) {
      return dispatch(fetchDashboardTab());
    }
    return dispatch(readyDashboardTab());
  };
}
