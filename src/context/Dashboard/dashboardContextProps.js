import store from '../../store';
import client from '../../utils/graphqlClient';
import { globalStatsData as statsCount } from '../../bento/globalStatsData';
import { widgetsData, facetSearchData } from '../../bento/dashboardData';

import {
  tabContainers,
  GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  GET_FILES_NAME_QUERY,
  tabIndex,
  DASHBOARD_QUERY,
  GET_FILES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,

  // Temp Queries
  FILTER_QUERY,
  FILTER_GROUP_QUERY,
} from '../../bento/dashboardTabData';

const storeKey = 'dashboardTab';

const dashboardContextProps = {
  store,
  storeKey,
  client,
  facetSearchData,
  // ### IMPORTED FROM bento/dashboardTabData ###
  tabContainers,
  DASHBOARD_QUERY,
  GET_FILES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  GET_FILES_NAME_QUERY,
  tabIndex,
  // Temp Queries
  FILTER_QUERY,
  FILTER_GROUP_QUERY,

  // ## ADDITIONAL FUNCTIONS FOR REDUCERS ##
  statsCount, // globalStatsData
  widgetsData, // dashboardData
};

export default dashboardContextProps;
