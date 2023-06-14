import React from 'react';
import { useSelector } from 'react-redux';
import { PUBLIC_ACCESS } from '../../bento/siteWideConfig';
import { accessLevelTypes } from '@bento-core/authentication';
import SearchView from './searchView';

const SearchViewController = ({ match }) => {
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
      searchparam={match.params.id}
    />
  );
};

export default SearchViewController;
