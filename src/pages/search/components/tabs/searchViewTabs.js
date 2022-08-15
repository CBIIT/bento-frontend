import React from 'react';
import {
  Box, Tab, Typography,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Subsection from '../searchResultSection';

const SearchViewTabs = ({
  classes, options, tab, searchText, isPublic,
}) => {
  const { handleChange, properties } = options;
  const errorPage = (errorStr) => <Typography variant="h5" color="error" size="sm">{errorStr}</Typography>;

  if (!handleChange || typeof handleChange !== 'function') {
    return errorPage('No handler found for tab change events.');
  }

  return (
    <TabContext value={tab} fullWidth inkBarStyle={{ background: '#142D64' }}>
      <Box sx={{ borderBottom: '1px solid #828282' }}>
        <TabList onChange={handleChange} aria-label="tabs" classes={{ root: classes.tabContainter, indicator: classes.indicator }}>
          {properties.map((prop) => (
            <Tab classes={prop.classes} label={`${prop.name} ${prop.count}`} value={prop.value} />
          ))}
        </TabList>
      </Box>
      {properties.map((prop) => (
        <TabPanel value={prop.value}>
          <Subsection
            isPublic={isPublic}
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
