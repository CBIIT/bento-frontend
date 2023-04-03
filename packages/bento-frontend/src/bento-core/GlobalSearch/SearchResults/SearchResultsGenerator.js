import React, { useEffect, useState } from 'react';
import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import PaginatedPanel from './components/PaginatedPanel';
import { DEFAULT_CONFIG_SEARCHRESULTS } from './config';

/**
 * This component provides a TabContext wrapper for the search results page
 *
 * @param {object} uiConfig - configuration object for the search results page
 * @return {object} { SearchResults }
 */
export const SearchResultsGenerator = (uiConfig = DEFAULT_CONFIG_SEARCHRESULTS) => {
  const {
    config, classes, functions, tabs: uiTabs,
  } = uiConfig;

  const tabChange = functions && typeof functions.onTabChange === 'function'
    ? functions.onTabChange
    : DEFAULT_CONFIG_SEARCHRESULTS.functions.onTabChange;

  const cardMap = config && config.resultCardMap ? config.resultCardMap : {};

  const pageSize = config && typeof config.pageSize === 'number'
    ? config.pageSize
    : DEFAULT_CONFIG_SEARCHRESULTS.config.pageSize;

  const tabs = uiTabs && uiTabs instanceof Array ? uiTabs : [];

  const activeTab = config && typeof config.defaultTab === 'string'
    ? config.defaultTab
    : uiTabs[0].value;

  const getTabData = functions && typeof functions.getTabData === 'function'
    ? functions.getTabData
    : DEFAULT_CONFIG_SEARCHRESULTS.functions.getTabData;

  return {
    SearchResults: (props) => {
      const { searchText } = props;

      const [tabValue, setTabValue] = useState(activeTab);

      const onChangeWrapper = (event, newTab) => {
        setTabValue(newTab);
        tabChange(event, newTab);
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
                    <span>
                      <span id={`global_search_tab_label_${idx}`}>
                        {typeof prop.name === 'function' ? prop.name() : prop.name}
                      </span>
                      {' '}
                      <span id={`global_search_tab_count_${idx}`}>{prop.count}</span>
                    </span>
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
                getTabData={getTabData}
                field={prop.field}
                pageSize={pageSize}
                resultCardMap={cardMap}
              />
            </TabPanel>
          ))}
        </TabContext>
      );
    },
  };
};

export default SearchResultsGenerator;
