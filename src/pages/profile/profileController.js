import React from 'react';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/client';
import ProfileView from './profileView';
import { testProfileInfoData, GET_MY_PROFILE_QUERY } from '../../bento/profileData';

class ProfileController extends React.Component {
  options = {}

  testingMode = true

  render() {
    const {
      loading, error, data,
    } = this.testingMode
      ? { loading: false, error: null, data: testProfileInfoData } : useQuery(GET_MY_PROFILE_QUERY);

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return (
        <Typography variant="headline" color="error" size="md">
          {error && 'An error has occurred in loading profile page controller'}
        </Typography>
      );
    }

    if (data) {
      return (<ProfileView data={data} />);
    }

    return (
      <ProfileView data={testProfileInfoData.data} />
    );
  }
}

export default ProfileController;
