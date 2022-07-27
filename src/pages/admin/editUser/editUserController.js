/* eslint-disable */
import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../../components/Wrappers/Wrappers';

// Importing GraphQL Query.
import {
  GET_USER,
} from '../../../bento/adminData';

// Importing View.
import EditUserView from './editUserView'

const editUserController = ({ match }) => {
  const userId = "6d5225d5-b11e-4f20-8303-093ef0686462"
  const { loading, error, data } = useQuery(
    GET_USER, 
    { 
      variables: {userID: userId},
      context: { clientName: 'userService' },
      fetchPolicy: 'no-cache' 
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
      <EditUserView data={data} />
    </div>
  );
};

export default editUserController;



// const ReviewRequestController = ({ match}) => {
//   console.log("User ID: ", match.params.id)

//   // Should be const "userId = match.params.id"
  
//   // get data
//   const { data, loading, error } = useQuery(
//     GET_USER, {
//        variables: {userID: userId},
//        context: { clientName: 'userService' },
//   });

//   console.log("Data: ", data )

//   return (
//     <View data={data}/>
//   )
// }
// export default ReviewRequestController;
