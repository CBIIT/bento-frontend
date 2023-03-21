import React, { useState } from 'react';
import TabGenerator from '../../../bento-core/Tab/TabGenerator';
import TabPanelGenrator from '../../../bento-core/Tab/TabPanelGenrator';
import TabPanel from './TabPanel';
import { tabContainers } from '../../../bento/dashboardTabData';

const customTheme = {
  MuiTabs: {
    root: {
      borderBottom: '10px solid #40789c',
    },
  },
  MuiTab: {
    root: {
      marginTop: '15px',
      color: '#6E6E6E',
      height: '45px',
      overflow: 'hidden',
      background: '#EAEAEA',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      fontWeight: '400',
      lineHeight: '18px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '21px',
      width: '250px',
      textTransform: 'none',
      fontFamily: 'Lato',
      '&.Mui-selected': {
        fontWeight: 'bolder',
        '&.cases': {
          background: '#d6f2ea',
          color: '#10a075',
        },
        '&.samples': {
          background: '#cfedf9',
          color: '#0dafec',
        },
        '&.files': {
          background: '#f7d7f7',
          color: '#c92ec7',
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.cases_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.samples_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.files_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
    },
  },
};

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const getTabs = (tabs) => tabs.map((tab) => ({
    ...tab,
    name: tab.name,
    count: `(${props.dashboardStats[tab.count]})`,
    clsName: `${tab.name}`.toLowerCase().replace(' ', '_'),
  }));

  return (
    <>
      <TabGenerator
        tabItems={getTabs(tabContainers)}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        customTheme={customTheme}
      />
      {
        tabContainers.map((tab, index) => (
          <>
            <TabPanelGenrator value={currentTab} index={index}>
              <TabPanel
                {...props}
                tab={tab}
                config={tab}
                activeTab={index === currentTab}
              />
            </TabPanelGenrator>
          </>
        ))
      }
    </>
  );
};

export default Tabs;
