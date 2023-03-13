import React, { useEffect, useState } from 'react';
import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import PaginatedPanel from './components/PaginatedPanel';

/**
 * This component provides a TabContext wrapper for the search results page
 *
 * @param {object} props
 * @param {object} props.classes - Material UI styles
 * @param {array} props.tabs - The tabs to display in the tab list
 * @param {string} props.searchText - The search text used for the search query
 * @param {function} [props.onTabChange] - The function to handle tab change events
 * @param {string} [props.activeTab] - The current tab selection
 * @param {number} [props.pageSize] - The number of results to display per page
 * @param {object} [props.resultCardMap] - The mapping of search result types to JSX components
 * @returns {JSX.Element}
 */
export const SearchResults = (props) => {
  const {
    classes, tabs, searchText,
    onTabChange, pageSize = 10, activeTab, resultCardMap,
  } = props;

  const [tabValue, setTabValue] = useState(activeTab || tabs[0].value);

  /**
   * Wrapper function for the onChange event of the TabList
   *
   * @param {object} event change event
   * @param {*} newTab the new tab value
   */
  const onChangeWrapper = (event, newTab) => {
    setTabValue(newTab);

    if (onTabChange && typeof onTabChange === 'function') {
      onTabChange(event, newTab);
    }
  };

  useEffect(() => {
    setTabValue(activeTab);
  }, [activeTab, searchText]);

  return (
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: '1px solid #828282' }}>
        <TabList onChange={onChangeWrapper} aria-label="tabs" classes={{ root: classes.tabContainter, indicator: classes.indicator }}>
          {tabs.map((prop, idx) => (
            <Tab
              key={`result_tab_${idx}`}
              classes={prop.classes}
              label={
                typeof prop.name === 'function'
                  ? prop.name()
                  : `${prop.name} ${prop.count}`
              }
              value={prop.value}
            />
          ))}
        </TabList>
      </Box>
      {tabs.map((prop, idx) => (
        <TabPanel value={prop.value} key={`result_panel_${idx}`}>
          <PaginatedPanel
            classes={prop.classes}
            searchText={searchText}
            count={prop.count}
            getData={prop.getData}
            pageSize={pageSize}
            resultCardMap={resultCardMap}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default SearchResults;
