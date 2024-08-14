import React from 'react';
import ToolTip from '@bento-core/tool-tip/src/ToolTip';
import {
  Tab,
  Tabs,
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';
import { defaultTheme } from './defaultTheme';
import generateStyle from './utils/generateStyle';

const TabItems = ({
  tabItems,
  handleTabChange,
  currentTab,
  orientation,
  customTheme = {},
}) => {
  const generatedStyle = generateStyle();
  const useStyles = makeStyles(generatedStyle);
  const classes = useStyles();

  const getTabLabel = ({
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

  const CustomTab = tabItems.map((tab, index) => {
    const { title: tooltipTitle, ...tooltipProps } = tab.tooltipConfig || {};

    return (
      (
        <ToolTip
          key={`tab_${index}_${tab.name}`}
          title={tooltipTitle || ''}
          classes={{
            tooltip: classes.customTooltip,
            arrow: classes.customArrow,
          }}
          {...tooltipProps}
        >
          <Tab
            index={index}
            label={getTabLabel({ ...tab, index })}
            className={tab.clsName}
            disableRipple
          />
        </ToolTip>
      )
    );
  });

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
      >
        {CustomTab}
      </Tabs>
    </ThemeProvider>
  );
};

export default TabItems;
