import React, { useState } from 'react';
import { Tab as MuiTab, Tabs as MuiTabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import generateStyle from './utils/generateStyle';
import TabThemeProvider from './TabThemeProvider';

/* Tabs coponenent */
function Tabs({
  tabData,
  onChange,
  styles,
}) {
  /* styles */
  const generatedStyle = generateStyle(styles);
  const useStyles = makeStyles(generatedStyle);
  const classes = useStyles();

  /* Component states */
  const [currentTab, setCurrentTab] = useState(0);

  /* tab headers and specific style generator */
  const getSpecificTabStyle = (currentSelectedTab, index, tabHeaderStyle = undefined) => {
    let style = {};
    if (tabHeaderStyle) {
      style = tabHeaderStyle.root ? { ...tabHeaderStyle.root } : {};
      if (currentSelectedTab === index && tabHeaderStyle.selected) {
        style = { ...style, ...tabHeaderStyle.selected };
      }
    }
    return style;
  };

  const TabHeader = tabData.map((tab, index) => {
    const specificTabStyle = getSpecificTabStyle(currentTab, index, tab.label.style);
    return (
      <MuiTab
        key={index}
        className={classes.tabsLabel}
        label={tab.label.content}
        style={specificTabStyle}
        disableRipple
      />
    );
  });

  /* event handlers */
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={classes.tabsContainer}>
      <TabThemeProvider
        muiTabTheme={generatedStyle.muiTab}
        muiTabsTheme={generatedStyle.muiTabs}
      >
        <MuiTabs value={currentTab} onChange={handleChange}>
          {TabHeader}
        </MuiTabs>

        {tabData.map((tab, index) => (
          <Typography key={index} component="div" className={classes.tabsPanel} hidden={currentTab !== index}>
            {tab.panel}
          </Typography>
        ))}

      </TabThemeProvider>
    </div>
  );
}

export default Tabs;
