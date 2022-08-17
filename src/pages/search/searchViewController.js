import React from 'react';
import { useSelector } from 'react-redux';
import SearchView from './searchView';

const SearchViewContainer = ({ match }) => {
  const isSignedIn = useSelector((state) => state.login.isSignedIn);
  const isAuthorized = useSelector(
    (state) => state.login.acl && state.login.acl.length > 0
      && state.login.acl.some((arm) => arm.accessStatus === 'approved'),
  );

  return (
    <SearchView
      isAuthorized={isAuthorized}
      isSignedIn={isSignedIn}
      loggedIn
      searchparam={match.params.id}
    />
  );
};

export default SearchViewContainer;
