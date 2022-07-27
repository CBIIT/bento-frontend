/* eslint-disable */
import React from 'react';
import { useQuery } from '@apollo/client';
import View from './reviewRequestView.js';

import { GET_USER } from '../../../bento/adminData';

const ReviewRequestController = ({ match }) => {
  console.log('User ID: ', match.params.id);

  // Should be const "userId = match.params.id"
  const userId = 'bffdc5e7-2da7-4adf-b2b0-aa36e4768ab2';
  // get data
  const { data, loading, error } = useQuery(
    GET_USER, { variables: { userID: userId } },
  );

  console.log('Data: ', data);

  return (
    <View data={data} />
  );
};
export default ReviewRequestController;
