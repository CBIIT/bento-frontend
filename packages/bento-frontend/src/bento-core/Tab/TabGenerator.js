import React from 'react';
import {
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';

const defaultTheme = {
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
  },
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
  tabHighlightColor: {
    color: '#6d9eba',
  },
  tabs: {
    paddingLeft: '10px',
  },
  MuiTab: {
    root: {
      fontFamily: 'Open Sans',
      textTransform: 'none',
      fontSize: '17px',
    },
  },
};

const TabItems = ({
  tabItems,
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
}) => {
  const getTabLalbel = ({ name, count, clsName }) => (
    <>
      <span>
        {name}
        {count && (
          <span className={`${clsName}_count`}>{count}</span>
        )}
      </span>
    </>
  );

  const TABs = tabItems.map((tab, index) => (
    <Tab
      index={index}
      label={
        getTabLalbel(tab)
      }
      key={index}
      className={tab.clsName}
      disableRipple
    />
  ));

  const themeConfig = createTheme({ overrides: { ...defaultTheme, ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
      >
        {TABs}
      </Tabs>
    </ThemeProvider>
  );
};

export default TabItems;
