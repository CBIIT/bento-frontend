import React from 'react';
import {
  Typography,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import participantFilesIcon from './assets/Participant_Files.svg';
import studyFilesIcon from './assets/Study_Files.svg';
import sampleFilesIcon from './assets/Sample_Files.svg';
import publicationsIcon from './assets/Publications.svg';

/**
* Studies Data Availability component
* Displays up to 4 icons based on data availability
*/

const StudiesDataAvailabilityView = ({
  column,
  row,
}) => {
  const useStyles = makeStyles(() => ({
    arrow: {
      '&:before': {
        border: '1px solid #598AC5',
      },
      color: 'white',
    },
    tooltip: {
      backgroundColor: 'white',
      border: '1px solid #598AC5',
      color: '#000000',
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    },
  }));

  const classes = useStyles();

  const { customCellData } = column;
  const fields = customCellData?.fields || [];

  // Extract the field values
  const numStudyFiles = row[fields[0]] || 0;
  const numParticipantFiles = row[fields[1]] || 0;
  const numSampleFiles = row[fields[2]] || 0;
  const numPublications = row[fields[3]] || 0;

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    width: customCellData?.width || '400px',
    padding: '8px 0',
  };

  const iconWrapperStyle = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const countStyle = {
    color: '#19676D',
    fontWeight: 600,
    fontSize: '16px',
    marginRight: '4px',
  };

  const labelStyle = {
    color: '#000000',
    fontSize: '14px',
  };

  const renderIcon = (icon, count, label, altText) => {
    if (count === 0) {
      // Return empty space to maintain layout
      return <div style={iconWrapperStyle} />;
    }

    return (
      <Tooltip
        title={(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={countStyle}>{count}</span>
            <span style={labelStyle}>{label}</span>
          </div>
        )}
        arrow
        placement="top"
        classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      >
        <div style={iconWrapperStyle}>
          <img src={icon} alt={altText} width="26" height="26" style={{ cursor: 'pointer' }} />
        </div>
      </Tooltip>
    );
  };

  return (
    <Typography component="div">
      <div style={containerStyle}>
        {renderIcon(participantFilesIcon, numParticipantFiles, 'Participant File(s)', 'Participant Files')}
        {renderIcon(studyFilesIcon, numStudyFiles, 'Study File(s)', 'Study Files')}
        {renderIcon(sampleFilesIcon, numSampleFiles, 'Sample File(s)', 'Sample Files')}
        {renderIcon(publicationsIcon, numPublications, 'Publication(s)', 'Publications')}
      </div>
    </Typography>
  );
};

export default StudiesDataAvailabilityView;
