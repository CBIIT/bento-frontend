import { globalStatsData as statsCount } from '../../../bento/globalStatsData';
import { widgetsData } from '../../../bento/dashboardData';
import * as Actions from './dashboardAction';
import {
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  filterData,
  getFilters,
  getCheckBoxData,
  customCheckBox,
  transformInitialDataForSunburst,
} from '../../../utils/dashboardUtilFunctions';

export const initialState = {
  dashboard: {
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

function getWidgetsData(input) {
  const donut = widgetsData.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? getSunburstDataFromDashboardData(input, widget.datatable_level1_field, widget.datatable_level2_field) : getDonutDataFromDashboardData(input, widget.datatable_field);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function getWidgetsInitData(data) {
  const donut = widgetsData.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName]) : data[widget.dataName];
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function getStatInit(input) {
  const initStats = statsCount.reduce((acc, widget) => (
    { ...acc, [widget.statAPI]: input[widget.statAPI] }
  ), {});
  return initStats;
}

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SINGLE_CHECKBOX: {
      const dataTableFilters = action.payload;
      const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? getCheckBoxData(
          state.subjectOverView.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        isLoading: false,
        stats: getStatDataFromDashboardData(tableData, statsCount),
        checkbox: {
          data: updatedCheckboxData,
          defaultPanel: action.payload[0].groupName,
        },
        datatable: {
          ...state.datatable,
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: getWidgetsData(tableData),
      };
    }
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case Actions.TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? getCheckBoxData(
          state.subjectOverView.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
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
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: getWidgetsData(tableData),
      };
    }
    case Actions.RECEIVE_DASHBOARD: {
      // get action data
      const checkboxData = customCheckBox(action.payload.data);
      return action.payload.data
        ? {
          ...state.dashboard,
          isFetched: true,
          isLoading: false,
          hasError: false,
          error: '',
          stats: getStatInit(action.payload.data),
          subjectOverView: {
            data: action.payload.data.subjectOverViewPaged,
          },
          checkboxForAll: {
            data: checkboxData,
          },
          checkbox: {
            data: checkboxData,
          },
          datatable: {
            data: action.payload.data.subjectOverViewPaged,
            filters: [],
          },
          widgets: getWidgetsInitData(action.payload.data),

        } : { ...state };
    }
    case Actions.DASHBOARD_QUERY_ERR:
      // get action data
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case Actions.READY_DASHBOARD:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case Actions.REQUEST_DASHBOARD:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
