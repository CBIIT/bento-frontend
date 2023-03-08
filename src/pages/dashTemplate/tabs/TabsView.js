import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './TabsStyle';
import TabViewGenerator from '../../../bento-core/Tab/TabViewGenerator';
import TabPanelGenrator from '../../../bento-core/Tab/TabPanelGenrator';
import TabView from './TabView';
import { tabContainers } from '../../../bento/dashboardTabData';

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <TabViewGenerator
        tabItems={tabContainers}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {
        tabContainers.map((tab, index) => (
          <TabPanelGenrator value={currentTab} index={index}>
            {(index === currentTab) && (
              <TabView
                {...props}
                tab={tab}
              />
            )}
          </TabPanelGenrator>
        ))
      }
    </>
  );
};

export default withStyles(styles)(Tabs);
