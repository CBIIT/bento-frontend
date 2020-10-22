import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import StatsView from './StatsView';

const Stats = () => {
  const data = useSelector((state) => (
    state.dashboard
    && state.dashboardTab.stats
      ? state.dashboardTab.stats : []));

  return (!data || data.length === 0 ? (<CircularProgress />) : <StatsView data={data} />);
};

export default (Stats);
