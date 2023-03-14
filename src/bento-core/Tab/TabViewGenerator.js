import React from 'react';
import {
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import TabLabel from './TabLable';

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
  styleClasses = {},
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
}) => {
  function getTabLalbel(title, image, index) {
    return (
      <TabLabel
        title={title}
        icon={image}
        style={(currentTab === index)
          ? styleClasses.tabHighlightStyle : styleClasses.tabDefaultStyle}
      />
    );
  }

  const TABs = tabItems.map((tab, index) => (
    <Tab
      index={index}
      label={
        getTabLalbel(tab.name, tab.icon, index)
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
