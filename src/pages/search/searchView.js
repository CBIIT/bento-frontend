import React, { useEffect, useState } from 'react';
import { withStyles, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { SearchBarGenerator, SearchResults } from '../../bento-core/GlobalSearch';
import { getTabSections } from './utils';
import styles from './styles';

import {
  getSearch,
  getSearchPublic,
  getSearchPageResults,
  getPublicSearchPageResults,
} from '../dashboardTab/store/dashboardReducer';
import {
  SEARCH_PAGE_KEYS,
  SEARCH_PAGE_DATAFIELDS,
} from '../../bento/search';

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
          <SearchResults
            classes={classes}
            searchText={searchText}
            activeTab="1"
            // Checking the inverse of authCheck() because we want to use the
            // public search queries if the user is NOT authorized.
            tabs={getTabSections(classes, searchCounts, !authCheck())}
            onTabChange={onTabChange}
            pageSize={10}
          />
        </Box>
      </div>
    </>
  );
}

export default withStyles(styles)(searchView);
