import { GET_GLOBAL_STATS_DATA_QUERY as STATS_QUERY } from '../../bento/globalStatsData';
import client from '../../utils/graphqlClient';

export const RECIEVE_STATS = 'RECIEVE_STATS';
export const STATS_QUERY_ERR = 'STATS_QUERY_ERR';
export const READY_STATS = 'READY_STATS';
export const REQUEST_STATS = 'REQUEST_STATS';

export const initialState = {
  isFetched: false,
  isLoading: false,
  error: '',
  hasError: false,
  data: [],
};

function shouldFetchDataForAllStats(state) {
  return !state.stats.isFetched;
}

function readyStats() {
  return {
    type: READY_STATS,
  };
}

function receiveStats(json) {
  return {
    type: RECIEVE_STATS,
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

function fetchStats(statQuery) {
  return (dispatch) => client
    .query({
      query: statQuery,
    })
    .then((result) => dispatch(receiveStats(result)))
    .catch((error) => dispatch(errorhandler(error, STATS_QUERY_ERR)));
}

export function fetchDataForStats() {
  return (dispatch, getState) => {
    if (shouldFetchDataForAllStats(getState())) {
      return dispatch(fetchStats(STATS_QUERY));
    }
    return dispatch(readyStats());
  };
}

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case RECIEVE_STATS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        isFetched: true,
        data: action.payload.data,
      };
    case STATS_QUERY_ERR:
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case READY_STATS:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case REQUEST_STATS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
