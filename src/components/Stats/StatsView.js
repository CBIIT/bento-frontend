import React from 'react';
import StatsBar from '../../bento-core/StatsBar';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

// TODO - see if the variables `data` and `stats` can be merged to begin with
const StatsView = ({ data }) => {
  // Incorporate data into the stats array
  const stats = globalStatsData.map((e) => ({
    ...e,
    val: data[e.statAPI],
  }));

  return (
    <StatsBar
      stats={stats}
      styles={statsStyling}
    />
  );
};

export default StatsView;
