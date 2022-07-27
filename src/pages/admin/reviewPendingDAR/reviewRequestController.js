/* eslint-disable */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography, CircularProgress } from '@material-ui/core';
import View from './reviewRequestView.js';
import { GET_USER } from '../../../bento/adminData';

const ReviewRequestController = ({ match }) => {
  console.log('User ID: ', match.params.id);

  const userId = match.params.id
  // get data
  const { data, loading, error } = useQuery(
    GET_USER, 
    { 
      context: { clientName: 'userService' },
      variables: { userID: userId } 
    },
  );

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  console.log('Data: ', data);

  return (
    <View data={data} />
  );
};
export default ReviewRequestController;
