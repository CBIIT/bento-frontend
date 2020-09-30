import _ from 'lodash';
import client from '../../../utils/graphqlClient';
import { DASHBOARD_QUERY } from '../utils/graphqlQueries';

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD';
export const DASHBOARD_QUERY_ERR = 'DASHBOARD_QUERY_ERR';
export const READY_DASHBOARD = 'READY_DASHBOARD';
export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD';
export const SINGLE_CHECKBOX = 'SINGLE_CHECKBOX';

export const toggleCheckBox = (payload) => ({
  type: TOGGLE_CHECKBOX,
  payload,
});

export const singleCheckBox = (payload) => ({
  type: SINGLE_CHECKBOX,
  payload,
});

function shouldFetchDataForDashboardDataTable(state) {
  return !(state.dashboard.isFetched);
}

function postRequestFetchDataDashboard() {
  return {
    type: REQUEST_DASHBOARD,
  };
}

function receiveDashboard(json) {
  const { data } = json;
  const cohortData = data.case.reduce((a, c) => {
    const accumulator = a;
    accumulator[c.case_id] = c.cohort;
    return accumulator;
  }, {});

  data.caseOverview = data.caseOverview.map((c) => {
    const currentValue = c;
    currentValue.cohort_description = (cohortData[c.case_id]
      && cohortData[c.case_id].cohort_description)
      ? cohortData[c.case_id].cohort_description
      : '';
    currentValue.weight = (currentValue.demographic
      && currentValue.demographic.weight)
      ? currentValue.demographic.weight
      : '';
    return currentValue;
  });

  return {
    type: RECEIVE_DASHBOARD,
    payload:
    {
      data: json.data,
    },
  };
}

function errorhandler(error, type) {
  return {
    type,
    error,
  };
}

function readyDashboard() {
  return {
    type: READY_DASHBOARD,
  };
}

function fetchDashboard() {
  return (dispatch) => {
    dispatch(postRequestFetchDataDashboard());
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => dispatch(receiveDashboard(_.cloneDeep(result))))
      .catch((error) => dispatch(errorhandler(error, DASHBOARD_QUERY_ERR)));
  };
}

export function fetchDataForDashboardDataTable() {
  return (dispatch, getState) => {
    if (shouldFetchDataForDashboardDataTable(getState())) {
      return dispatch(fetchDashboard());
    }
    return dispatch(readyDashboard());
  };
}
