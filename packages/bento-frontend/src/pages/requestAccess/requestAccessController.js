/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../components/Wrappers/Wrappers';
import {DataAccessRequest} from '@bento-core/data-access-request';
import { formFields, pageTitle, SUBMIT_REQUEST_ACCESS } from '../../bento/requestAccessData';
import custodianUtils from '../../utils/custodianUtilFuncs';
import Stats from '../../components/Stats/AllStatsController';
import { bentoHelpEmail } from '../../bento/loginData';
import AlertMessage from "../../bento-core/AlertMessage";

// Importing GraphQL Query.
import {
  GET_ACCESS_CONTROL_LEVEL_DETAILS_QUERY,
} from '../../bento/requestAccessData';


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
      <Stats />
      <DataAccessRequest 
       data= {data} 
       formFields = {formFields}
       pageTitle = {pageTitle}
       SUBMIT_REQUEST_ACCESS ={SUBMIT_REQUEST_ACCESS}
       custodianUtils={custodianUtils}
       bentoHelpEmail={bentoHelpEmail}
       AlertMessage = {AlertMessage}
      />
    </div>
  );
};

export default accessRequestController;
