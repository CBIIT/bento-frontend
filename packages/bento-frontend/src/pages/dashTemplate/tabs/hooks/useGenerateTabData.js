import React, { useEffect, useState } from 'react';
import TabPanel from '../TabPanel';

const useGenerateTabData = ({
  tabContainers, activeFilters, dashboardStats, activeTab,
}) => {
  /* states */
  const [generatedTabData, setGeneratedTabData] = useState([]);

  /* Generators */
  const generatelabel = (tab) => ({
    content:
    (
      <span>
        {tab.name}
        <span className="count">
          (
          {dashboardStats[tab.count]}
          )
        </span>
      </span>
    ),
    style: tab.tabHeaderStyle,

  }
  );

  const generatePanel = (tab, index) => (

    <TabPanel
      tab={tab}
      config={tab}
      dashboardStats={dashboardStats}
      activeFilters={activeFilters}
      activeTab={index === activeTab}
    />
  );

  const generateTabData = () => tabContainers.map((tab, index) => ({
    label: generatelabel(tab),
    panel: generatePanel(tab, index),
  }));

  /* useEffects */
  useEffect(() => {
    if (dashboardStats) {
      setGeneratedTabData(generateTabData());
    }
  }, [activeTab, dashboardStats]);

  return { generatedTabData, dashboardStats };
};

export default useGenerateTabData;
