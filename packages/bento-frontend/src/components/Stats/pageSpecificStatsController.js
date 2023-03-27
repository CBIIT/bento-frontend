import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { filterData } from 'bento-components';
import { getFilteredStat, fetchDataForDashboardDataTable } from '../../pages/dashboard/dashboardState';

import StatsView from './StatsView';

const Stats = ({ filter }) => {
  const dispatch = useDispatch();
  const initDashboardStatus = () => () => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const data = useSelector((state) => {
    if (!state.dashboard.isFetched) {
      initDashboardStatus();
    }
    return state.dashboard
      && state.dashboard.subjectOverView
       && state.dashboard.subjectOverView.data
      ? (
        function extraData(d) {
          return getFilteredStat(d);
        }(state.dashboard.subjectOverView.data.filter(
          (d) => (filterData(d, filter)),
        ))
      ) : [];
  });
  return (!data || data.length === 0 ? (<CircularProgress />) : <StatsView data={data} />);
};

export default (Stats);
