import React, { useState } from 'react';
import {
  Typography,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { cellTypes } from '../../util/Types';
import cpiIconSingle from './assets/CPI_Icon_Single.svg';
import cpiIconMulti from './assets/CPI_Icon_Multi.svg';
import cpiIconStudy from './assets/CPI_Icon_Study.svg';
import cpiIconDataset from './assets/CPI_Icon_Dataset.svg';
import CPIModal from './CPIModal';

/**
* CPI Mapping component - displays different icons based on domain_category
*/

const CPIMappingView = ({
  row,
  themeConfig,
  navigation,
  rowIndex,
}) => {
  const useStyles = makeStyles(() => ({
    arrow: {
      '&:before': {
        border: '1px solid black',
      },
      color: 'white',
    },
    tooltip: {
      backgroundColor: 'white',
      border: '1px solid black',
      color: 'black',
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontStyle: 'Regular',
      fontSize: '13px',
      lineHeight: '17.5px',
      letterSpacing: '-0.01em',
      padding: '10px',
    },
  }));

  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const cpiData = row.cpi_data ? row.cpi_data : [];

  // Filter ALL CPI data by data_type for tooltip logic
  const internalData = cpiData.filter((e) => e.data_type === 'internal');
  const externalData = cpiData.filter((e) => e.data_type === 'external');

  // Group CPI data by domain_category
  const organizationalData = cpiData.filter((e) => e.domain_category === 'organizational_identifier');
  const datasetData = cpiData.filter((e) => e.domain_category === 'dataset');
  const studyData = cpiData.filter((e) => e.domain_category === 'study');

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const button = {
    color: '#07679C',
    textDecoration: 'underline',
    fontWeight: 700,
    cursor: 'pointer',
    padding: 0,
    marginLeft: '3px',
  };

  const italicText = {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '13px',
    lineHeight: '19px',
    letterSpacing: '-0.01em',
  };

  const iconContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '24px',
    width: '150px',
  };

  const icon = {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const badgeContainer = {
    position: 'relative',
    display: 'inline-block',
  };

  // Determine row background color based on index (even rows are gray)
  const isEvenRow = rowIndex !== undefined && rowIndex % 2 === 1;
  const rowBackgroundColor = isEvenRow ? '#f4f5f5' : 'white';

  const getBadgeStyle = (count, iconType) => {
    let rightOffset = '-8px';
    let bottomOffset = '0.5px';
    let boxShadow = 'none';

    if (iconType === 'organizational' && count === 1) {
      rightOffset = '-6px';
      bottomOffset = '0.5px';
    } else if (iconType === 'organizational') {
      // Multi organizational icon - no box shadow needed
      rightOffset = '-8px';
      boxShadow = 'none';
    } else {
      // Dataset and Study icons need gap
      boxShadow = `0 0 0 2px ${rowBackgroundColor}`;
    }

    return {
      position: 'absolute',
      right: rightOffset,
      bottom: bottomOffset,
      backgroundColor: 'white',
      border: '1.5px solid #07679C',
      borderRadius: '4px',
      minWidth: '12px',
      height: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px 3px',
      fontSize: '8px',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '16px',
      letterSpacing: '-0.02em',
      color: '#07679C',
      fontFamily: 'Open Sans',
      boxShadow,
    };
  };

  const renderIcon = (iconSrc, count, iconType) => {
    if (count === 0) return null;

    let tooltipContent;

    // Same tooltip logic for all icon types
    if (externalData.length === 1 && internalData.length === 0) {
      tooltipContent = (
        <div>
          dbGaP identifier mapped in the CCDI Participant Index (CPI) is available
          <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>
            here.
          </span>
        </div>
      );
    } else if (externalData.length > 1 && internalData.length === 0) {
      tooltipContent = (
        <div>
          Multiple alternative identifiers mapped in the CCDI Participant Index (CPI) are available
          <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>
            here.
          </span>
        </div>
      );
    } else {
      // Has internal identifiers
      tooltipContent = (
        <div>
          <div style={{ marginBottom: '6px' }}>
            This participant has more than one identifier in CCDI Hub studies:
          </div>
          {internalData.map((e) => (
            <div key={e.associated_id} style={italicText}>
              {`${e.associated_id}, ${e.repository_of_synonym_id}`}
            </div>
          ))}
          <div style={{ marginTop: '6px' }}>
            Additional alternative identifiers mapped in the
            CCDI Participant Index (CPI) for this participant are available
            <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>
              here.
            </span>
          </div>
        </div>
      );
    }

    return (
      <Tooltip
        key={`${iconType}-tooltip`}
        interactive
        placement="top"
        classes={{
          arrow: classes.arrow,
          tooltip: classes.tooltip,
        }}
        arrow
        title={tooltipContent}
      >
        <span style={icon}>
          <span style={badgeContainer}>
            <img
              src={iconSrc}
              height={21}
              width={23}
              alt={`cpi-${iconType}-icon`}
            />
            <span style={getBadgeStyle(count, iconType)}>{count}</span>
          </span>
        </span>
      </Tooltip>
    );
  };

  const getOrganizationalIcon = (count) => (count === 1 ? cpiIconSingle : cpiIconMulti);

  if (!cpiData.length) {
    return <Typography />;
  }

  return (
    <Typography className={cellTypes.CPI_MAPPING}>
      <CPIModal
        key={`${row.id}-${row.participant_id}`}
        row={row}
        open={modalOpen}
        onClose={handleModalClose}
        themeConfig={themeConfig}
        navigation={navigation}
      />
      <div style={iconContainer}>
        {organizationalData.length > 0 && renderIcon(
          getOrganizationalIcon(organizationalData.length),
          organizationalData.length,
          'organizational',
        )}
        {datasetData.length > 0 && renderIcon(
          cpiIconDataset,
          datasetData.length,
          'dataset',
        )}
        {studyData.length > 0 && renderIcon(
          cpiIconStudy,
          studyData.length,
          'study',
        )}
      </div>
    </Typography>
  );
};

export default CPIMappingView;
