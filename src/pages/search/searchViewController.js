import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <SearchView userInformation={null} loggedIn={false} searchparam={match.params.id} />
    );
  }

  return (<SearchView userInformation={userData} loggedIn searchparam={match.params.id} />);
};

export default SearchViewContainer;
