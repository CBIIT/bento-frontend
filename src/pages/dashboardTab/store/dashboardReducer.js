/* eslint-disable */
import _ from 'lodash';
import { globalStatsData as statsCount } from '../../../bento/globalStatsData';
import { widgetsData } from '../../../bento/dashboardData';
import store from '../../../store';
import client from '../../../utils/graphqlClient';
import { DASHBOARD_QUERY, FILTER_QUERY, FILTER_GROUP_QUERY } from '../utils/graphqlQueries';
import {
  customCheckBox,
  transformInitialDataForSunburst,
  getFilters,
  filterData,
  getCheckBoxData,
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
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
      filters: [],
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
    { ...acc, [stat.statAPI]: input[stat.datatable_field] }
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

const allfilters = {
  "programs": [],
  "studies": [],
  "diagnoses": [],
  "rc_scores": [],
  "tumor_sizes": [],
  "chemo_regimen": [],
  "tumor_grades": [],
  "er_status": [],
  "pr_status": [],
  "endo_therapies": [],
  "meno_status": [],
}

/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json} 
 */

function createFilterVariables(data) {
  const filter = Object.entries(allfilters).reduce((acc , [key, val]) => {
    if(data[0].datafield == key)
      return { ...acc , [key]: [data[0].name] }
    return { ...acc , [key]: [] };
  }, {});

  return {...filter, "first": 10};
}

// export function toggleCheckBox(payload) {
//   return store.dispatch({ type: 'TOGGGLE_CHECKBOX', payload });
// }

export function toggleCheckBox(payload) {
  return () => {
    return client
      .query({  //request to get the filtered subjects
        query: FILTER_QUERY,
        variables: createFilterVariables(payload),
      })
      .then((result) =>  { 
        return client.query({  //request to get the filtered group counts
        query: FILTER_GROUP_QUERY,
        variables: { "subject_ids": result.data.searchSubjects.subjectIds},
      })
      .then((result2) => {
      return store.dispatch({ type: 'TOGGGLE_CHECKBOX2', payload: Object.assign({filter: payload},{groups: _.cloneDeep(result2)}, _.cloneDeep(result)) })
    })
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
        // return store.dispatch({ type: 'TOGGGLE_CHECKBOX2', payload: Object.assign({filter: payload}, _.cloneDeep(result)) })
      })
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
  };
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
  TOGGGLE_CHECKBOX2: (state, item) => {
    const dataTableFilters = getFilters(state.datatable.filters, item.filter);
    const updatedCheckboxData1 = customCheckBox(item.groups.data);

    // This function is to get updated checkbox data and counts this needs to be updated
    const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
      ? getCheckBoxData(
        state.subjectOverView.data,
        state.checkboxForAll.data,
        state.checkbox.data.filter((d) => item.filter[0].groupName === d.groupName)[0],
        dataTableFilters,
      )
      : state.checkboxForAll.data;
    return{
    ...state,
    checkbox: {
      data: updatedCheckboxData1,
    },
    checkbox: {
      data: updatedCheckboxData1,
    },
    datatable: {
      ...state.datatable,
      filters: dataTableFilters,
    },
    stats: getFilteredStat(item.data.searchSubjects),
    widgets: getWidgetsInitData(item.groups.data),
  }},
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
