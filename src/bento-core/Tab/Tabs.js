import React, { useState } from 'react';
import { Tab, Tabs, Typography } from '@material-ui/core';
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

  /* tab headers */
  const TabHeader = tabData.map((tab, index) => (
    <Tab className={classes.tabsLabel} key={index} label={tab.label} />
  ));

  /* Component states */
  const [currentTab, setCurrentTab] = useState(0);

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
        <Tabs value={currentTab} onChange={handleChange}>
          {TabHeader}
        </Tabs>
        <Typography component="div" className={classes.tabsPanel}>
          {tabData[currentTab].panel}
        </Typography>
      </TabThemeProvider>
    </div>
  );
}

export default Tabs;
