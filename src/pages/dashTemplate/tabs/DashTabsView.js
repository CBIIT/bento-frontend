import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './DashTabsStyle';
import { tabContainers } from './TableConfig';
import TableView from './table/TableController';
import TabViewGenerator from '../../../bento-core/Tab/TabViewGenerator';
import TabPanelGenrator from '../../../bento-core/Tab/TabPanelGenrator';

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
          <>
            <TabPanelGenrator value={currentTab} index={index}>
              <TableView
                {...props}
                tab={tab}
              />
            </TabPanelGenrator>
          </>
        ))
      }
    </>
  );
};

export default withStyles(styles)(Tabs);
