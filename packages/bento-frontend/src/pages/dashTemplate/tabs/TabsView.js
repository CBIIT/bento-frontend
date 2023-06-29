import React, { useState } from 'react';
import TabPanel from './TabPanel';
import { tabContainers } from '../../../bento/dashboardTabData';
import { Tabs as BentoTabs }  from '@bento-core/tab';
import { customTheme } from './DefaultTabTheme';
import Programs from '../../programs/programsController';

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  /**
  * 1. change <name> to <display> as array item
  * 2. <display> -> [tab.name, props.dashboardStats[tab.count]]
  */
  const getTabs = (tabs) => tabs.map((tab) => ({
    ...tab,
    name: tab.name,
    count:tab.count?`(${props.dashboardStats[tab.count]})`:'',
    display: [tab.name, props.dashboardStats[tab.count]],
    clsName: `${tab.name}`.toLowerCase().replace(' ', '_'),
  }));

  const getDefaultTabPanel = (tab, props, index) => {
    return (
    
        <TabPanel
          {...props}
          tab={tab}
          config={tab}
          activeTab={index === currentTab}
        />
      
  )}

  const getCustomTabPanel = (tab, props, index) => {
    return <Programs />
  }

  return (
    <>
      <BentoTabs
        tabItems={getTabs(tabContainers)}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        customTheme={customTheme}
      />
      
      {
        tabContainers.map((tab, index) => (
        <>
          <div hidden={currentTab !== index}>
            {tab.type === 'custom' ? getCustomTabPanel(tab, props, index) : getDefaultTabPanel(tab, props, index)}
          </div>
        </>
        )
      )
      }
    </>
  );
};

export default Tabs;
