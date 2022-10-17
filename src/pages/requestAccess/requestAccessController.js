/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../components/Wrappers/Wrappers';

// Importing GraphQL Query.
import {
  GET_ACCESS_CONTROL_LEVEL_DETAILS_QUERY,
} from '../../bento/requestAccessData';

// Importing View.
import RequestAccessView from './requestAccessView';

const accessRequestController = ({ match }) => {
  const { loading, error, data } = useQuery(GET_ACCESS_CONTROL_LEVEL_DETAILS_QUERY,
    {
      context: { clientName: 'userService' },
      fetchPolicy: 'no-cache',
    });

  if (loading) return <CircularProgress />;

  if (error || !data) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <div>
      <RequestAccessView data={data} />
    </div>
  );
};

export default accessRequestController;
