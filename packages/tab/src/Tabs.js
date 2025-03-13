import React from 'react';
import {
  Tab,
  Tabs,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
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
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        {name.split(' ').map((word, index2) => (
          <span key={index2}>{word}</span>
        ))}
      </span>
      {count && (
        <span
          className={`index_${index} ${clsName}_count`}
          style={{ paddingLeft: '4px' }}
        >
          {count}
        </span>
      )}
    </div>
  );

  const TABs = tabItems.map((tab, index) => (

    tab.hasToolTip
      ? (
        <ToolTip {...tab.tooltipStyles} title={tab.toolTipText || '.'} arrow placement="top">
          <Tab
            index={index}
            label={
        getTabLalbel({ ...tab, index })
      }
            key={index}
            className={tab.clsName}
            disableRipple
          />
        </ToolTip>
      )
      : (
        <Tab
          index={index}
          label={
    getTabLalbel({ ...tab, index })
  }
          key={index}
          className={tab.clsName}
          disableRipple
        />
      )

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
