import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  SEARCH_PAGE_RESULT_ABOUT, SEARCH_PAGE_RESULT_FILES,
  SEARCH_PAGE_RESULT_MODEL, SEARCH_PAGE_RESULT_PROGRAM,
  SEARCH_PAGE_RESULT_SAMPLES, SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_SUBJECTS,
} from '../../../../bento/search';
import styles from '../../styles';
import SearchViewTabs from './searchViewTabs';

const allCount = (searchResults) => (searchResults.subject_count
  + searchResults.sample_count + searchResults.program_count
  + searchResults.study_count + searchResults.file_count
  + searchResults.model_count + searchResults.about_count);

const getTabProperties = (classes, searchResults, allLabel) => [
  {
    name: allLabel && typeof allLabel === 'function' ? allLabel() : 'All',
    datafield: 'all',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.allTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_SUBJECTS,
    count: allCount(searchResults) || 0,
    value: '1',
  },
  {
    name: 'Cases',
    datafield: 'subjects',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.subjectTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_SUBJECTS,
    count: searchResults.subject_count || 0,
    value: '2',
  },
  {
    name: 'Samples',
    datafield: 'samples',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.sampleTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_SAMPLES,
    count: searchResults.sample_count || 0,
    value: '3',
  },
  {
    name: 'Files',
    datafield: 'files',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.fileTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_FILES,
    count: searchResults.file_count || 0,
    value: '4',
  },
  {
    name: 'Programs',
    datafield: 'programs',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.programTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_PROGRAM,
    count: searchResults.program_count || 0,
    value: '5',
  },
  {
    name: 'Studies',
    datafield: 'studies',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.studyTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_STUDIES,
    count: searchResults.study_count || 0,
    value: '6',
  },
  {
    name: 'Data Model',
    datafield: 'model',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.dataTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_MODEL,
    count: searchResults.model_count || 0,
    value: '7',
  },
  {
    name: 'About',
    datafield: 'about_page',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.aboutTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_ABOUT,
    count: searchResults.about_count || 0,
    value: '8',
  },
];

const PrivateTabView = ({
  classes, options, tab, searchText,
}) => {
  const { searchResults } = options;
  const tabProperties = getTabProperties(classes, searchResults);
  const AllLabel = () => (
    <div>
      <img
        className={classes.filterIcon}
        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FunnelIcon.svg"
        alt="filter icon"
      />
      <span classes={classes.allText}>ALL</span>
    </div>
  );

  return (
    <SearchViewTabs
      AllLabel={AllLabel}
      classes={classes}
      tab={tab}
      isPublic={false}
      searchText={searchText}
      options={{ ...options, properties: tabProperties }}
    />
  );
};

export default withStyles(styles, { withTheme: true })(PrivateTabView);
