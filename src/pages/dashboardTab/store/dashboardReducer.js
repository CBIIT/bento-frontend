import _ from 'lodash';
import { globalStatsData as statsCount } from '../../../bento/globalStatsData';
import { widgetsData } from '../../../bento/dashboardData';
import store from '../../../store';
import client from '../../../utils/graphqlClient';
import {
  DASHBOARD_QUERY,
  FILTER_QUERY,
  FILTER_GROUP_QUERY,
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
} from '../../../bento/dashboardTabData';
import {
  customCheckBox,
  updateCheckBox,
  transformInitialDataForSunburst,
  getFilters,
  filterData,
  getCheckBoxData,
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  setSelectedFilterValues,
} from '../../../utils/dashboardUtilFunctions';

const storeKey = 'dashboardTab';

const initialState = {
  dashboardTab: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    error: '',
    hasError: false,
    stats: {},
    allActiveFilters: {},
    currentActiveTab: 'Cases',
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
      data: [],
    },
    widgets: {},
  },
};

// HELPERS
const getState = () => store.getState()[storeKey];

function shouldFetchDataForDashboardTabDataTable(state) {
  return !(state.isFetched);
}

function getStatInit(input) {
  const initStats = statsCount.reduce((acc, widget) => (
    { ...acc, [widget.statAPI]: input[widget.statAPI] }
  ), {});
  return initStats;
}

function getFilteredStat(input) {
  const initStats = statsCount.reduce((acc, stat) => (
    { ...acc, [stat.statAPI]: input[stat.statAPI] }
  ), {});
  return initStats;
}

function getWidgetsInitData(data) {
  const donut = widgetsData.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName]) : data[widget.dataName];
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

const allFilters = {
  programs: [],
  studies: [],
  diagnoses: [],
  rc_scores: [],
  tumor_sizes: [],
  chemo_regimen: [],
  tumor_grades: [],
  er_status: [],
  pr_status: [],
  endo_therapies: [],
  meno_status: [],
};

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

// export function toggleCheckBox(payload) {
//   return store.dispatch({ type: 'TOGGGLE_CHECKBOX', payload });
// }

export function toggleCheckBox(payload) {
  return () => {
    const currentAllFilterVariables = createFilterVariables(payload);
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
 * Updates the current active dashboard tab.
 *
 * @param {object} data
 * @return {json}
 */

export function getDataForTab(payload, subjectIDsAfterFilter = null) {
  const QUERY = payload === 'Samples' ? GET_SAMPLES_OVERVIEW_QUERY : payload === 'Files' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY;
  const VARIABLES = subjectIDsAfterFilter || getState().filteredSubjectIds;
  return client
    .query({
      query: QUERY,
      variables: { subject_ids: VARIABLES },

    })
    .then((result) => store.dispatch({ type: 'UPDATE_CURRRENT_TAB_DATA', payload: { currentTab: payload, ..._.cloneDeep(result) } }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}

function getWidgetsData(input) {
  const donut = widgetsData.reduce((acc, widget) => {
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
  }),
  TOGGGLE_CHECKBOX_WITH_API: (state, item) => {
    const updatedCheckboxData1 = updateCheckBox(
      state.checkbox.data, item.groups.data, item.filter[0], item.allFilters,
    );
    const checkboxData1 = setSelectedFilterValues(updatedCheckboxData1, item.allFilters);
    getDataForTab(state.currentActiveTab, item.data.searchSubjects.subjectIds);
    return {
      ...state,
      allActiveFilters: item.allFilters,
      filteredSubjectIds: item.data.searchSubjects.subjectIds,
      checkbox: {
        data: checkboxData1,
      },
      datatable: {
        ...state.datatable,
        dataCase: item.data.searchSubjects.firstPage,
      },
      stats: getFilteredStat(item.data.searchSubjects),
      widgets: getWidgetsInitData(item.groups.data),
    };
  },
  UPDATE_CURRRENT_TAB_DATA: (state, item) => (
    {
      ...state,
      currentActiveTab: item.currentTab,
      datatable: {
        ...state.datatable,
        dataCase: item.data.subjectOverViewPaged,
        dataSample: item.data.sampleOverview,
        dataFile: item.data.fileOverview,
      },
    }
  ),
  REQUEST_DASHBOARDTAB: (state) => ({ ...state, isLoading: true }),
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
      widgets: getWidgetsData(tableData),
    };
  },
  RECEIVE_DASHBOARDTAB: (state, item) => {
    const checkboxData = customCheckBox(item.data);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        error: '',
        stats: getStatInit(item.data),
        allActiveFilters: allFilters,
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
        widgets: getWidgetsInitData(item.data),

      } : { ...state };
  },
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
