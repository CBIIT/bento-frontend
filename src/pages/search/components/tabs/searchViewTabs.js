import React from 'react';
import {
  Box, Tab, Typography,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Subsection from '../searchResultSection';
import {
  SEARCH_PAGE_RESULT_SUBJECTS,
} from '../../../../bento/search';

const allCount = (searchResults) => (searchResults.subject_count
  + searchResults.sample_count + searchResults.program_count
  + searchResults.study_count + searchResults.file_count
  + searchResults.model_count + searchResults.about_count);

const SearchViewTabs = ({
  AllLabel, classes, options, tab, searchText,
}) => {
  const { handleChange, searchResults, properties } = options;
  const errorPage = (errorStr) => <Typography variant="h5" color="error" size="sm">{errorStr}</Typography>;

  if (!handleChange || typeof handleChange !== 'function') {
    return errorPage('No handler found for tab change events.');
  }

  return (
    <TabContext value={tab} fullWidth inkBarStyle={{ background: '#142D64' }}>
      <Box sx={{ borderBottom: '1px solid #828282' }}>
        <TabList onChange={handleChange} aria-label="tabs" classes={{ root: classes.tabContainter, indicator: classes.indicator }}>
          <Tab label={AllLabel()} classes={{ root: classes.buttonRoot, wrapper: classes.allTab }} value="1" />
          {properties.map((prop) => (
            <Tab classes={prop.classes} label={`${prop.name} ${prop.count}`} value={prop.value} />
          ))}
        </TabList>
      </Box>
      <TabPanel value="1">
        <Subsection
          searchText={searchText}
          queryforAPI={SEARCH_PAGE_RESULT_SUBJECTS}
          count={allCount(searchResults) || 0}
          datafield="all"
        />
      </TabPanel>
      {properties.map((prop) => (
        <TabPanel value={prop.value}>
          <Subsection
            searchText={searchText}
            queryForAPI={prop.queryForApi}
            count={prop.count}
            datafield={prop.datafield}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default SearchViewTabs;
