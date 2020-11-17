import React from 'react';
import { StatsBar } from 'bento-components';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

const StatsView = ({ data }) => (
  <>
    <StatsBar
      data={data}
      globalStatsData={globalStatsData}
      statsStyling={statsStyling}
    />
  </>
);

export default StatsView;
