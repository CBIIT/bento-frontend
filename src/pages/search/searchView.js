import React, { useEffect, useState } from 'react';
import { withStyles, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {
  SearchBarGenerator, SearchResultsGenerator, countValues,
} from '../../bento-core/GlobalSearch';
import styles from './styles';

import client from '../../utils/graphqlClient';
import {
  getSearch, getSearchPublic,
  getSearchPageResults, getPublicSearchPageResults,
} from '../dashboardTab/store/dashboardReducer';
import {
  SEARCH_PAGE_DATAFIELDS, SEARCH_PAGE_KEYS,
  SEARCH_PAGE_RESULT_FILES, SEARCH_PAGE_RESULT_MODEL,
  SEARCH_PAGE_RESULT_SAMPLES, SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_ABOUT, SEARCH_PAGE_RESULT_PROGRAM, SEARCH_PAGE_RESULT_SUBJECTS,
  SEARCH_PUBLIC, SEARCH_PAGE_RESULT_PROGRAM_PUBLIC, SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
} from '../../bento/search';

/**
 * Maps a private datafield to the correct search query
 *
 * @param {string} field datatable field name
 */
function getPrivateQuery(field) {
  switch (field) {
    case 'all':
      return SEARCH_PAGE_RESULT_SUBJECTS;
    case 'subjects':
      return SEARCH_PAGE_RESULT_SUBJECTS;
    case 'samples':
      return SEARCH_PAGE_RESULT_SAMPLES;
    case 'files':
      return SEARCH_PAGE_RESULT_FILES;
    case 'programs':
      return SEARCH_PAGE_RESULT_PROGRAM;
    case 'studies':
      return SEARCH_PAGE_RESULT_STUDIES;
    case 'model':
      return SEARCH_PAGE_RESULT_MODEL;
    case 'about_page':
      return SEARCH_PAGE_RESULT_ABOUT;
    default:
      return SEARCH_PAGE_RESULT_SUBJECTS;
  }
}

/**
 * Maps a public datafield to the correct search query
 *
 * @param {string} field datatable field name
 */
function getPublicQuery(field) {
  switch (field) {
    case 'all':
      return SEARCH_PUBLIC; // Starting point for ALL tab
    case 'subjects':
      return SEARCH_PAGE_RESULT_SUBJECTS;
    case 'samples':
      return SEARCH_PAGE_RESULT_SAMPLES;
    case 'files':
      return SEARCH_PAGE_RESULT_FILES;
    case 'programs':
      return SEARCH_PAGE_RESULT_PROGRAM_PUBLIC;
    case 'studies':
      return SEARCH_PAGE_RESULT_STUDIES;
    case 'model':
      return SEARCH_PAGE_RESULT_MODEL;
    case 'about_page':
      return SEARCH_PAGE_RESULT_ABOUT_PUBLIC;
    default:
      return SEARCH_PAGE_RESULT_SUBJECTS;
  }
}

/**
 * Helper function to perform a GraphQL API query
 *
 * @param {string} datafield
 * @param {object} input search query variable input
 * @param {boolean} isPublic is the search public or private
 */
async function queryAPI(datafield, input, isPublic) {
  const data = await client.query({
    query: isPublic ? getPublicQuery(datafield) : getPrivateQuery(datafield),
    variables: input,
    context: {
      clientName: isPublic ? 'publicService' : '',
    },
  })
    .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
    .catch(() => []);

  return data[datafield];
}

/**
 * Helper function to determine the correct datafield and offset for the All tab
 * based off of the current offset and the number of results for each datafield
 *
 * @param {string} searchText
 * @param {number} calcOffset
 * @param {number} pageSize
 * @param {boolean} isPublic
 */
async function getAllQueryField(searchText, calcOffset, pageSize, isPublic) {
  const searchResp = isPublic ? await getPublicSearchPageResults(searchText)
    : await getSearchPageResults(searchText);

  const custodianConfigForTabData = isPublic ? [{ countField: 'about_count', nameField: 'about_page' }]
    : [{ countField: 'subject_count', nameField: 'subjects' },
      { countField: 'sample_count', nameField: 'samples' },
      { countField: 'file_count', nameField: 'files' },
      { countField: 'program_count', nameField: 'programs' },
      { countField: 'study_count', nameField: 'studies' },
      { countField: 'model_count', nameField: 'model' },
      { countField: 'about_count', nameField: 'about_page' }];

  let acc = 0;
  const mapCountAndName = custodianConfigForTabData.map((obj) => {
    acc += searchResp[obj.countField];
    return { ...obj, value: acc };
  });

  // Create filter for next Query
  const filter = mapCountAndName.filter((obj) => obj.value > calcOffset)[0];
  const filterForOffset = mapCountAndName.filter((obj) => obj.value <= calcOffset);
  const val = filterForOffset.length === 0
    ? 0
    : filterForOffset[filterForOffset.length - 1].value;

  if (filter !== undefined) {
    return {
      datafieldValue: filter.nameField,
      offsetValue: (Math.abs(calcOffset - val) / pageSize) * pageSize,
    };
  }

  return { datafieldValue: isPublic ? 'about_page' : 'subject', offsetValue: 0 };
}

/**
 * Wrapper for the queryAPI function to get the All tab's data
 *
 * @param {string} search the search input value
 * @param {number} offset the offset value
 * @param {number} pageSize the pagination page size
 * @param {boolean} isPublic whether to use a public or private query
 */
async function queryAllAPI(search, offset, pageSize, isPublic) {
  const {
    datafieldValue, offsetValue,
  } = await getAllQueryField(search, offset, pageSize, isPublic);

  const input = {
    input: search,
    first: pageSize,
    offset: offsetValue,
  };

  return queryAPI(datafieldValue, input, isPublic);
}

function searchView(props) {
  const {
    classes, searchparam = '',
    isSignedIn, isAuthorized, publicAccessEnabled,
  } = props;

  const history = useHistory();
  const [searchText, setSearchText] = useState(searchparam);
  const [searchCounts, setSearchCounts] = useState([]);

  const authCheck = () => isAuthorized || publicAccessEnabled;

  /**
   * Handle the tab selection change event, and redirect the user
   * to the login/request page if they are not authorized.
   *
   * @param {object} event change event
   * @param {*} newTab new tab value
   * @returns void
   */
  const onTabChange = (event, newTab) => {
    const activeVal = newTab.split('-')[0];

    if (activeVal === 'inactive') {
      if (isSignedIn && !isAuthorized) {
        history.push(`/request?redirect=/search/${searchText}`);
        return;
      }
      history.push(`/login?redirect=/search/${searchText}`);
    }
  };

  /**
   * Returns the correct GraphQL search results count query based on the user's
   * authorization status.
   *
   * @param {string} search the search string query
   */
  const getAuthorizedResultQuery = (search) => {
    if (authCheck()) {
      return getSearchPageResults(search);
    }

    return getPublicSearchPageResults(search);
  };

  /**
   * Returns the correct GraphQL autocomplete search query based on the user's
   * authorization status.
   *
   * @param {string} search the search string query
   */
  function getAuthorizedSearchQuery(search) {
    if ((authCheck())) {
      return getSearch(search);
    }

    return getSearchPublic(search);
  }

  /**
   * Handle the search box input change event
   *
   * @param {string} value
   * @returns void
   */
  const onSearchChange = (value) => {
    if (!value || typeof value !== 'string') { return; }
    if (value === searchText) { return; }
    if (value.trim() === '') { return; }

    getAuthorizedResultQuery(value).then((d) => {
      setSearchText(value);
      setSearchCounts(d);
      history.push(`/search/${value}`);
    });
  };

  /**
   * Perform the search bar auto complete search
   *
   * @param {object} _config search bar configuration
   * @param {string} value search text
   * @param {string} reason reason for the function call
   */
  const getSearchSuggestions = async (_config, value, reason) => {
    if (!value || typeof value !== 'string') {
      setSearchText('');
      setSearchCounts([]);
      if (reason === 'clear') {
        history.push('/search');
      }
      return [];
    }
    if (value.trim() === '') { return []; }

    const authed = authCheck();
    const res = await getAuthorizedSearchQuery(value);
    const mapOption = (authed ? SEARCH_PAGE_KEYS.private : SEARCH_PAGE_KEYS.public).map(
      (key, index) => res[key].map(
        (id) => (id[authed
          ? SEARCH_PAGE_DATAFIELDS.private[index]
          : SEARCH_PAGE_DATAFIELDS.public[index]]),
      ),
    );
    const option = mapOption.length > 0
      ? mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]) : [];

    return [...[value.toUpperCase()], ...option];
  };

  /**
   * Helper function to get the data for a given tab
   *
   * @param {string} field the datafield property to search
   * @param {number} pageSize the pagination page size
   * @param {number} currentPage the current page offset
   */
  const getTabData = async (field, pageSize, currentPage) => {
    const isPublic = !authCheck();

    // Handle the 'All' tab search separately
    if (field === 'all') {
      const count = isPublic ? searchCounts.about_count : countValues(searchCounts);
      let data = await queryAllAPI(searchText, (currentPage - 1) * pageSize, pageSize, isPublic);

      // If the current set of data is less than the page size,
      // we need to query the next datafield for it's data
      if (data && (data.length !== pageSize)) {
        let apiQueries = 0;
        let calcOffset2 = (currentPage - 1) * pageSize + data.length;

        // eslint-disable-next-line max-len
        while (apiQueries < 5 && data.length !== count && calcOffset2 < count && data.length !== pageSize) {
          // eslint-disable-next-line no-await-in-loop
          const data2 = await queryAllAPI(searchText, calcOffset2, pageSize, isPublic);
          data = [...data, ...data2];
          calcOffset2 = (currentPage - 1) * pageSize + data.length;
          apiQueries += 1;
        }
      }

      return (data || []).slice(0, pageSize);
    }

    // Handle all of the other tabs
    const input = {
      input: searchText,
      first: pageSize,
      offset: (currentPage - 1) * pageSize,
    };
    const data = await queryAPI(field, input, isPublic);
    return (data || []).slice(0, pageSize);
  };

  const { SearchBar } = SearchBarGenerator({
    classes,
    config: {
      placeholder: '',
      iconType: 'image',
      maxSuggestions: 0,
      minimumInputLength: 0,
    },
    functions: {
      onChange: onSearchChange,
      getSuggestions: getSearchSuggestions,
    },
  });

  const { SearchResults } = SearchResultsGenerator({
    classes,
    functions: {
      onTabChange,
      getTabData,
    },
    tabs: [{
      name: 'All',
      field: 'all',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: !authCheck() ? searchCounts.about_count : countValues(searchCounts) || 0,
      value: '1',
    },
    {
      name: 'Cases',
      field: 'subjects',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.subject_count || 0,
      value: `${!authCheck() ? 'inactive-' : ''}2`,
    },
    {
      name: 'Samples',
      field: 'samples',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.sample_count || 0,
      value: `${!authCheck() ? 'inactive-' : ''}3`,
    },
    {
      name: 'Files',
      field: 'files',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.file_count || 0,
      value: `${!authCheck() ? 'inactive-' : ''}4`,
    },
    {
      name: 'Programs',
      field: 'programs',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.program_count || 0,
      value: `${!authCheck() ? 'inactive-' : ''}5`,
    },
    {
      name: 'Studies',
      field: 'studies',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.study_count || 0,
      value: `${!authCheck() ? 'inactive-' : ''}6`,
    },
    {
      name: 'Data Model',
      field: 'model',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.model_count || 0,
      value: `${!authCheck() ? 'inactive-' : ''}7`,
    },
    {
      name: 'About',
      field: 'about_page',
      classes: {
        root: classes.buttonRoot,
        wrapper: classes.tabColor,
      },
      count: searchCounts.about_count || 0,
      value: '8',
    }],
  });

  useEffect(() => {
    if (searchparam.trim() === '') {
      return;
    }

    getAuthorizedResultQuery(searchparam).then((d) => {
      setSearchCounts(d);
    });
  }, []);

  return (
    <>
      <div className={classes.heroArea}>
        <div>
          <SearchBar value={searchText} clearable={!false} style={{ width: 750 }} />
        </div>
      </div>
      <div className={classes.bodyContainer}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <SearchResults searchText={searchText} />
        </Box>
      </div>
    </>
  );
}

export default withStyles(styles)(searchView);
