import React from 'react';
import { Typography } from '@material-ui/core';
import AlertMessage from '../components/AlertView';
import getDateInFormat from '../../../../utils/date';

// Filter data based on "accessStatus" being equal to "pending", then reformat "requestDate"
export const filterData = (userData) => {
  let filteredData = [];
  if (userData && Array.isArray(userData)) {
    filteredData = userData
      .filter((element) => element.accessStatus === 'pending')
      .map((element) => {
        const formattedDate = getDateInFormat(element.requestDate, '/');
        return { ...element, requestDate: formattedDate };
      });
  }
  return filteredData;
};

export const showAlert = (accessStatus, setAccessStatus) => {
  if (accessStatus === 'rejected' || accessStatus === 'approved') {
    return (
      <AlertMessage timeout={3000} onClose={setAccessStatus}>
        <Typography align="center">
          {`This Arm has been ${accessStatus}.`}
          <br />
          An email confirmation will be sent to the user.
        </Typography>
      </AlertMessage>
    );
  }
  return <></>;
};

export default filterData;
