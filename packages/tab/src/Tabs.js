import React from 'react';
import {
  Tab,
  Tabs,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { defaultTheme } from './defaultTheme';

const TabItems = ({
  tabItems,
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
}) => {
  const getTabLalbel = ({
    name, count, clsName, index,
  }) => (
    <>
      <span>
        {name}
        {count && (
        <span
          className={`index_${index} ${clsName}_count`}
        >
          {count}
        </span>
        )}
      </span>
    </>
  );

  const TABs = tabItems.map((tab, index) => (
    <Tab
      index={index}
      label={
        getTabLalbel({ ...tab, index })
      }
      key={index}
      className={tab.clsName}
      disableRipple
    />
  ));

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });
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
