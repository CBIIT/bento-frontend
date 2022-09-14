import React from 'react';
import { Typography } from '@material-ui/core';
import AlertMessage from '../components/AlertView';
import getDateInFormat from '../../../../utils/date';

// Reformat requestDate
export const reformatDate = (userData) => {
  let formattedData = [];
  if (userData && Array.isArray(userData)) {
    formattedData = userData
      .map((element) => {
        const formattedDate = getDateInFormat(element.requestDate, '/');
        return { ...element, requestDate: formattedDate };
      });
  }
  return formattedData;
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

export default reformatDate;
