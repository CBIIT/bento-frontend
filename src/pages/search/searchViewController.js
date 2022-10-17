import React from 'react';
import { useSelector } from 'react-redux';
import SearchView from './searchView';
import { PUBLIC_ACCESS } from '../../bento/siteWideConfig';
import accessLevelTypes from '../../utils/enums';

const SearchViewContainer = ({ match }) => {
  const isSignedIn = useSelector((state) => state.login.isSignedIn);
  const isAdmin = useSelector((state) => state.login && state.login.role && state.login.role === 'admin');
  const hasApprovedArms = useSelector(
    (state) => state.login.acl && state.login.acl.some((arm) => arm.accessStatus === 'approved'),
  );
  const isAuthorized = isSignedIn && (hasApprovedArms || isAdmin);

  return (
    <SearchView
      publicAccessEnabled={PUBLIC_ACCESS === accessLevelTypes.METADATA_ONLY}
      isAuthorized={isAuthorized}
      isSignedIn={isSignedIn}
      loggedIn
      searchparam={match.params.id}
    />
  );
};

export default SearchViewContainer;
