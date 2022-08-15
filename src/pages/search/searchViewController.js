import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
// import { useSelector } from 'react-redux';
import SearchView from './searchView';
import { GET_MY_PROFILE_QUERY } from '../../bento/profileData';

const SearchViewContainer = ({ match }) => {
  const {
    loading, error, data: userData,
  } = useQuery(GET_MY_PROFILE_QUERY, {
    context: {
      clientName: 'userService',
    },
  });

  // const isSignedIn = useSelector((state) => state.login.isSignedIn);
  // const isAuthorized = useSelector((state) =>
  // state.login.acl.length > 0 && state.login.acl.some((arm) => arm.accessStatus === 'approved'));

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <SearchView
        // isSignedIn={isSignedIn}
        // isAuthorized={isAuthorized}
        userInformation={null}
        loggedIn={false}
        searchparam={match.params.id}
      />
    );
  }

  return (
    <SearchView
      userInformation={userData}
      // isAuthorized={isAuthorized}
      // isSignedIn
      loggedIn
      searchparam={match.params.id}
    />
  );
};

export default SearchViewContainer;
