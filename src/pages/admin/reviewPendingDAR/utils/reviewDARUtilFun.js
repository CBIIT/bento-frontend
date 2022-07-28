import React from 'react';
import { Typography } from '@material-ui/core';
import AlertMessage from '../components/AlertView';

const getFormattedDate = (strDate) => {
  const date = new Date(strDate);

  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0'.concat(month);

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0'.concat(day);

  return `${month}/${day}/${year}`;
};

// Filter data arms that only has requested for accessStatus
export const getOnlyRequestedArms = (userArmData) => {
  let filteredData = userArmData || [];
  if (userArmData) {
    filteredData = userArmData.filter((arm) => arm.accessStatus === 'requested');
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

export default getFormattedDate;
