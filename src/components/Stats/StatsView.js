import React from 'react';
import StatsBar from '../../bento-core/StatsBar';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

const StatsView = ({ data }) => (
  <StatsBar
    data={data}
    stats={globalStatsData}
    styles={statsStyling}
  />
);

export default StatsView;
