import React, { useState } from 'react';
import {
  Typography,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { cellTypes } from '../../util/Types';
import cpiIconSingle from './assets/CPI_Icon_Single.svg';
import cpiIconMulti from './assets/CPI_Icon_Multi.svg';
import CPIModal from './CPIModal';

/**
* Custom Link component
*/

const CPIView = ({
  column,
  row,
  themeConfig,
  navigation,
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
  const internalData = cpiData.filter((e) => (e.data_type === 'internal'));
  const externalData = cpiData.filter((e) => (e.data_type === 'external'));

  // Select icon based on data length
  const cpiIcon = cpiData.length === 1 ? cpiIconSingle : cpiIconMulti;

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

  const icon = {
    marginLeft: '10px',
    position: 'relative',
    top: '5px',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const badgeContainer = {
    position: 'relative',
    display: 'inline-block',
  };

  const getBadgeStyle = () => ({
    position: 'absolute',
    right: cpiData.length === 1 ? '-4px' : '-6px',
    bottom: cpiData.length === 1 ? '0.5px' : '0px',
    backgroundColor: '#07679C',
    borderRadius: '4px',
    minWidth: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 3px',
    fontSize: '9px',
    fontWeight: 700,
    color: 'white',
    fontFamily: 'Poppins',
  });

  return (
    <Typography className={cellTypes.CPI}>
      {row[column?.dataField]}
      {cpiData.length
        ? (
          <>
            <CPIModal
              key={`${row.id}-${row.participant_id}`}
              row={row}
              open={modalOpen}
              onClose={handleModalClose}
              themeConfig={themeConfig}
              navigation={navigation}
            />
            <Tooltip
              interactive
              placement="top"
              arrow
              disableFocusListener
              disableTouchListener
              style={{
                pointerEvents: 'auto',
                backgroundColor: 'transparent',
                font: 'Poppins',
                fontSize: '13px',
              }}
              classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              title={
                (externalData.length === 1 && internalData.length === 0
                  ? (
                    <div>
                      dbGaP identifier mapped in the CCDI Participant Index (CPI) is available
                      <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>here.</span>
                    </div>
                  )
                  : externalData.length > 1 && internalData.length === 0
                    ? (
                      <div>
                        Multiple alternative identifiers mapped in the
                        CCDI Participant Index (CPI) are available
                        <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>here.</span>
                      </div>
                    )
                    : (
                      <div>
                        <div style={{ marginBottom: '6px' }}>This participant has more than one identifier in CCDI Hub studies:</div>
                        {internalData.map((e) => (
                          <div key={e.associated_id} style={italicText}>{`${e.associated_id}, ${e.repository_of_synonym_id}`}</div>
                        ))}
                        <div style={{ marginTop: '6px' }}>
                          Additional alternative identifiers mapped in the
                          CCDI Participant Index (CPI) for this participant are available
                          <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>here.</span>
                        </div>
                      </div>
                    )
                )
              }
            >
              <span style={icon}>
                <span style={badgeContainer}>
                  <img
                    src={cpiIcon}
                    height={21}
                    width={23}
                    alt="cpi-icon"
                  />
                  <span style={getBadgeStyle()}>{cpiData.length}</span>
                </span>
              </span>
            </Tooltip>
          </>
        )
        : <></>}
    </Typography>
  );
};

export default CPIView;
