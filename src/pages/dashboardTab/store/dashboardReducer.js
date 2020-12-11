/* eslint-disable */

import _ from 'lodash';
import {
  customCheckBox,
  updateCheckBox,
  getFilters,
  filterData,
  getCheckBoxData,
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  setSelectedFilterValues,
  transformInitialDataForSunburst,
} from 'bento-components';
import { globalStatsData as statsCount } from '../../../bento/globalStatsData';
import { widgetsData, facetSearchData } from '../../../bento/dashboardData';

import store from '../../../store';
import client from '../../../utils/graphqlClient';
import {
  tabContainers,
  DASHBOARD_QUERY,
  FILTER_QUERY,
  FILTER_GROUP_QUERY,
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_ALL_FILEIDS_FOR_SELECT_ALL,
  GET_FILES_OVERVIEW_DESC_QUERY,
  GET_SAMPLES_OVERVIEW_DESC_QUERY,
  GET_CASES_OVERVIEW_DESC_QUERY,
  tabIndex,
} from '../../../bento/dashboardTabData';

const storeKey = 'dashboardTab';

const initialState = {
  dashboardTab: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    isDashboardTableLoading: false,
    setSideBarLoading: false,
    error: '',
    hasError: false,
    stats: {},
    allActiveFilters: {},
    currentActiveTab: tabIndex[0].title,
    filteredSubjectIds: [],
    checkboxForAll: {
      data: [],
    },
    subjectOverView: {
      data: [],
    },
    checkbox: {
      data: [],
      defaultPanel: false,
    },
    datatable: {
      dataCase: 'undefined',
      dataSample: 'undefined',
      dataFile: 'undefined',
    },
    widgets: {},
  },
};

// HELPERS
const getState = () => store.getState()[storeKey];

function shouldFetchDataForDashboardTabDataTable(state) {
  return !(state.isFetched);
}

/**
 * Returns the  stats from inputAPI data.
 * @param {object} data
 *  @param {json} statCountVariables
 * @return {json}
 */
function getStatInit(input, statCountVariables) {
  const initStats = statCountVariables.reduce((acc, widget) => (
    { ...acc, [widget.statAPI]: input[widget.statAPI] }
  ), {});
  return initStats;
}

/**
 * Returns the filtered stats from inputAPT data.
 * @param {object} data
 *  @param {json} statCountVariables
 * @return {json}
 */
function getFilteredStat(input, statCountVariables) {
  const filteredStats = statCountVariables.reduce((acc, stat) => (
    { ...acc, [stat.statAPI]: input[stat.statAPI] }
  ), {});
  return filteredStats;
}

/**
 * removes EmptySubjectsFromDonutDataa.
 * @param {object} data
 *  @param {object}
 */
const removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);

/**
 * Returns the widgets data.
 * @param {object} data
 * @param {json} widgetsInfoFromCustConfig
 * @return {json}r
 */
function getWidgetsInitData(data, widgetsInfoFromCustConfig) {
  const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName]) : removeEmptySubjectsFromDonutData(data[widget.dataName]);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function fetchDashboardTab() {
  return () => {
    store.dispatch({ type: 'REQUEST_DASHBOARDTAB' });
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => store.dispatch({ type: 'RECEIVE_DASHBOARDTAB', payload: _.cloneDeep(result) }))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
  };
}

function fetchDashboardTabForClearAll() {
  return () => client
    .query({
      query: DASHBOARD_QUERY,
    })
    .then((result) => store.dispatch({ type: 'CLEAR_ALL', payload: _.cloneDeep(result) }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}

/**
 * Generate a default varibles for filter query.
 *
 * Need to be updated with custodian of filter
 * @return json
 */

function allFilters() {
  const emptyFilters = facetSearchData.reduce((acc, facet) => (
    { ...acc, [facet.datafield]: [] }
  ), {});
  return emptyFilters;
}
/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json}
 */

function createFilterVariables(data) {
  const currentAllActiveFilters = getState().allActiveFilters;
  // eslint-disable-next-line  no-unused-vars
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
    if (data[0].datafield === key) {
      return data[0].isChecked
        ? { ...acc, [key]: [...currentAllActiveFilters[key], ...[data[0].name]] }
        : { ...acc, [key]: currentAllActiveFilters[key].filter((item) => item !== data[0].name) };
    }
    // return { ...acc , [key]: [...currentAllActiveFilters[key],...[data[0].name]] }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});

  return filter;
}

/**
 * Trigger respective API queries when checkbox is checked.
 *
 * @param {object} payload
 * @return distpatcher
 */
export function toggleCheckBox(payload) {
  return () => {
    const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
    return client
      .query({ // request to get the filtered subjects
        query: FILTER_QUERY,
        variables: { ...currentAllFilterVariables, first: 100 },
      })
      .then((result) => client.query({ // request to get the filtered group counts
        query: FILTER_GROUP_QUERY,
        variables: { subject_ids: result.data.searchSubjects.subjectIds },
      })
        .then((result2) => store.dispatch({
          type: 'TOGGGLE_CHECKBOX_WITH_API',
          payload: {
            filter: payload,
            allFilters: currentAllFilterVariables,
            groups: _.cloneDeep(result2),
            ..._.cloneDeep(result),
          },
        }))
        .catch((error) => store.dispatch(
          { type: 'DASHBOARDTAB_QUERY_ERR', error },
        )))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
  };
}

/**
 * Switch to get query sort dorection and sort field .
 *
 * @param {string} payload
 *  @param {json} tabContainer
 * @return {json} with three keys QUERY, sortfield, sortDirection
 */

const querySwitch = (payload, tabContainer) => {
  switch (payload) {
    case ('Samples'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : GET_SAMPLES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Files'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_FILES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    default:
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_CASES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
  }
};

/**
 * Function to get getquery and default sort.
 *
 * @param {string} payload
 * @return {json} with three keys QUERY,GET_CASES_OVERVIEW_DESC_QUERY, sortfield
 */

const getQueryAndDefaultSort = (payload = tabIndex[0].title) => {
  const tabContainer = tabContainers.find((x) => x.name === payload);
  return querySwitch(payload, tabContainer);
};

/**
 * Updates the current active dashboard tab.
 *
 * @param {object} data
 * @return {json}
 */

export function fetchDataForDashboardTab(payload, subjectIDsAfterFilter = null) {
  const { QUERY, sortfield, sortDirection } = getQueryAndDefaultSort(payload);
  const VARIABLES = subjectIDsAfterFilter || getState().filteredSubjectIds;
  return client
    .query({
      query: QUERY,
      variables: { subject_ids: VARIABLES, order_by: sortfield || '' },
    })
    .then((result) => store.dispatch({ type: 'UPDATE_CURRRENT_TAB_DATA', payload: { currentTab: payload, sortDirection, ..._.cloneDeep(result) } }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}

export async function fetchAllFileIDsForSelectAll(fileCount = 100000) {
  const VARIABLES = getState().filteredSubjectIds;

  const fetchResult = await client
    .query({
      query: GET_ALL_FILEIDS_FOR_SELECT_ALL,
      variables: { subject_ids: VARIABLES, first: fileCount },
    })
    .then((result) => result.data.subjectOverViewPaged);
  return fetchResult;
}

export const getFilesCount = () => getState().stats.numberOfFiles;

/**
 * Returns the widgets data.
 * @param {object} data
 * @param {json} widgetsInfoFromCustConfig
 * @return {json}r
 */
function getWidgetsData(input, widgetsInfoFromCustConfig) {
  const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? getSunburstDataFromDashboardData(input, widget.datatable_level1_field, widget.datatable_level2_field) : getDonutDataFromDashboardData(input, widget.datatable_field);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

export function fetchDataForDashboardTabDataTable() {
  if (shouldFetchDataForDashboardTabDataTable(getState())) {
    return store.dispatch(fetchDashboardTab());
  }
  return store.dispatch({ type: 'READY_DASHBOARDTAB' });
}

  export async function singleCheckBox(payload) {
  await clearFilterState();
    toggleCheckBoxWithAPIAction(payload);
  };

  export async function clearFilterState(payload) {
    store.dispatch({ type: 'CLEAR_FILTERS' });
    };


  function toggleCheckBoxWithAPIAction(payload) {
    const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
    return client
      .query({ // request to get the filtered subjects
        query: FILTER_QUERY,
        variables: { ...currentAllFilterVariables, first: 100 },
      })
      .then((result) => client.query({ // request to get the filtered group counts
        query: FILTER_GROUP_QUERY,
        variables: { subject_ids: result.data.searchSubjects.subjectIds },
      })
        .then((result2) => store.dispatch({
          type: 'TOGGGLE_CHECKBOX_WITH_API',
          payload: {
            filter: payload,
            allFilters: currentAllFilterVariables,
            groups: _.cloneDeep(result2),
            ..._.cloneDeep(result),
          },
        }))
        .catch((error) => store.dispatch(
          { type: 'DASHBOARDTAB_QUERY_ERR', error },
        )))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
  }

export function clearAllFilters() {
  store.dispatch(fetchDashboardTabForClearAll());
}

export function setSideBarToLoading() {
  store.dispatch({ type: 'SET_SIDEBAR_LOADING' });
}

export function setDashboardTableLoading() {
  store.dispatch({ type: 'SET_DASHBOARDTABLE_LOADING' });
}

export const getDashboard = () => getState();

// reducers
const reducers = {
  DASHBOARDTAB_QUERY_ERR: (state, item) => ({
    ...state,
    hasError: true,
    error: item,
    isLoading: false,
    isFetched: false,
  }),
  READY_DASHBOARDTAB: (state) => ({
    ...state,
    isLoading: false,
    isFetched: true,
    setSideBarLoading: false,
    isDashboardTableLoading: false,
  }),
  TOGGGLE_CHECKBOX_WITH_API: (state, item) => {
    const updatedCheckboxData1 = updateCheckBox(
      state.checkbox.data, item.groups.data, item.filter[0], facetSearchData,
    );
    const checkboxData1 = setSelectedFilterValues(updatedCheckboxData1, item.allFilters);
    fetchDataForDashboardTab(state.currentActiveTab, item.data.searchSubjects.subjectIds);
    return {
      ...state,
      setSideBarLoading: false,
      allActiveFilters: item.allFilters,
      filteredSubjectIds: item.data.searchSubjects.subjectIds,
      checkbox: {
        data: checkboxData1,
      },
      stats: getFilteredStat(item.data.searchSubjects, statsCount),
      widgets: getWidgetsInitData(item.groups.data, widgetsData),
    };
  },
  UPDATE_CURRRENT_TAB_DATA: (state, item) => (
    {
      ...state,
      isDashboardTableLoading: false,
      currentActiveTab: item.currentTab,
      datatable: {
        ...state.datatable,
        dataCase: item.sortDirection === 'desc' ? item.data.subjectOverViewPagedDesc : item.data.subjectOverViewPaged,
        dataSample: item.sortDirection === 'desc' ? item.data.sampleOverviewDesc : item.data.sampleOverview,
        dataFile: item.sortDirection === 'desc' ? item.data.fileOverviewDesc : item.data.fileOverview,
      },
    }
  ),
  REQUEST_DASHBOARDTAB: (state) => ({ ...state, isLoading: true }),
  SET_SIDEBAR_LOADING: (state) => ({ ...state, setSideBarLoading: true }),
  CLEAR_FILTERS: (state) => ({ ...state, allActiveFilters: allFilters() }),
  SET_DASHBOARDTABLE_LOADING: (state) => ({ ...state, isDashboardTableLoading: true }),
  TOGGGLE_CHECKBOX: (state, item) => {
    const dataTableFilters = getFilters(state.datatable.filters, item);
    const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
    const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
      ? getCheckBoxData(
        state.subjectOverView.data,
        state.checkboxForAll.data,
        state.checkbox.data.filter((d) => item[0].groupName === d.groupName)[0],
        dataTableFilters,
      )
      : state.checkboxForAll.data;
    return {
      ...state,
      isCalulatingDashboard: false,
      stats: getStatDataFromDashboardData(tableData, statsCount),
      checkbox: {
        data: updatedCheckboxData,
      },
      datatable: {
        ...state.datatable,
        dataCase: tableData,
        filters: dataTableFilters,
      },
      filters: dataTableFilters,
      widgets: getWidgetsData(tableData, widgetsData),
    };
  },
  RECEIVE_DASHBOARDTAB: (state, item) => {
    const checkboxData = customCheckBox(item.data, facetSearchData);
    fetchDataForDashboardTab(tabIndex[0].title, []);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        setSideBarLoading: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
        allActiveFilters: allFilters(),
        filteredSubjectIds: [],
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          filters: [],
        },
        widgets: getWidgetsInitData(item.data, widgetsData),

      } : { ...state };
  },
  CLEAR_ALL: (state, item) => {
    const checkboxData = customCheckBox(item.data, facetSearchData);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
        allActiveFilters: allFilters(),
        filteredSubjectIds: [],
        subjectOverView: {
          data: item.data.subjectOverViewPaged,
        },
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          dataCase: item.data.subjectOverViewPaged,
          dataSample: item.data.sampleOverview,
          dataFile: item.data.fileOverview,
          filters: [],
        },
        widgets: getWidgetsInitData(item.data, widgetsData),

      } : { ...state };
  },
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
