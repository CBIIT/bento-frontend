import React, { useState } from 'react';
import {
  Typography,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { cellTypes } from '../../util/Types';
import cpiIcon from './assets/CPI_icon.svg';
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
      font: 'Poppins',
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '17.5px',
    },
  }));

  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const cpiData = row.cpi_data;
  const internalData = cpiData.filter((e) => (e.data_type === 'internal'));
  const externalData = cpiData.filter((e) => (e.data_type === 'external'));

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

  const icon = {
    marginLeft: '10px',
    position: 'relative',
    top: '5px',
    cursor: 'pointer',
  };

  return (
    <Typography className={cellTypes.CPI}>
      {row[column?.dataField]}
      {cpiData.length
        ? (
          <>
            <CPIModal
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
                (externalData.length && internalData.length === 0
                  ? (
                    <div>
                      All mapped identifiers in the CCDI Participant Index (CPI) are available
                      <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>here.</span>
                    </div>
                  )
                  : (
                    <div>
                      <div style={{ marginBottom: '3px' }}>Identifier mapped in CCDI Hub:</div>
                      {internalData.map((e) => (
                        <div>{`${e.associated_id}, ${e.repository_of_synonym_id}`}</div>
                      ))}
                      <p>
                        All mapped identifiers in the CCDI Participant Index (CPI) are available
                        <span role="button" onClick={handleModalOpen} tabIndex={0} style={button}>here.</span>
                      </p>
                    </div>
                  )
                )
              }
            >
              <span style={icon}>
                <img
                  src={cpiIcon}
                  height={21}
                  width={23}
                  alt="cpi-icon"
                />
              </span>
            </Tooltip>
          </>
        )
        : <></>}
    </Typography>
  );
};

export default CPIView;
