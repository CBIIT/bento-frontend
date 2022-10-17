import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../../components/Wrappers/Wrappers';

// Importing GraphQL Query.
import {
  GET_USER, VIEW,
} from '../../../bento/adminData';

// Importing View.
import EditUserView from './userDetailView';

const editUserController = ({ match }) => {
  const { loading, error, data } = useQuery(
    GET_USER,
    {
      variables: { userID: match.params.id },
      context: { clientName: 'userService' },
      fetchPolicy: 'no-cache',
    },
  );

  if (loading) return <CircularProgress />;

  if (error || !data || !data.getUser) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <div>
      <EditUserView data={data} accessType={VIEW} />
    </div>
  );
};

export default editUserController;
