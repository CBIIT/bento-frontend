import React from 'react';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import TabLabel from './TabLable';

const TabItems = ({
  tabItems,
  styleClasses = {},
  handleTabChange,
  currentTab,
  orientation,
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
      disableRipple
    />
  ));

  return (
    <>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
        className={styleClasses.tabs}
      >
        {TABs}
      </Tabs>
    </>
  );
};

const styles = () => ({
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
});

export default withStyles(styles)(TabItems);
