import React from 'react';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/client';
import ProfileView from './profileView';
import { GET_MY_PROFILE_QUERY } from '../../bento/profileData';

const ProfileController = () => {
  const {
    loading, error, data,
  } = useQuery(GET_MY_PROFILE_QUERY, {
    context: {
      clientName: 'userService',
    },
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="headline" color="error" size="md">
        {error && 'An error has occurred in loading profile page'}
      </Typography>
    );
  }

  return (
    <ProfileView data={data} />
  );
};

export default ProfileController;
