import React, { useState } from 'react';
import {
  Typography,
  Tooltip,
  IconButton,
  Button,
  ClickAwayListener,
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

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cpiData = row.cpi_data;
  const internalData = cpiData.filter((e) => (e.data_type === 'internal'));
  const externalData = cpiData.filter((e) => (e.data_type === 'external'));

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const button = {
    background: 'none',
    border: 'none',
    padding: '0',
    color: '#069',
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  return (
    <Typography className={cellTypes.CPI}>
      <CPIModal
        row={row}
        open={modalOpen}
        onClose={handleModalClose}
        themeConfig={themeConfig}
      />
      {row[column?.dataField]}
      {cpiData.length
        ? (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              open={open}
              interactive
              placement="top-end"
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              style={{
                pointerEvents: 'auto',
                backgroundColor: 'transparent',
              }}
              classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              title={
                (externalData.length && internalData.length === 0
                  ? (
                    <div>
                      All mapped identifiers in the CCDI Participant Index (CPI) are available here
                    </div>
                  )
                  : (
                    <div>
                      <div>Identifier mapped in CCDI Hub:</div>
                      {internalData.map((e) => (
                        <div>{`${e.associated_id}, ${e.repository_of_synonym_id}`}</div>
                      ))}
                      <p>
                        All mapped identifiers in the CCDI Participant Index (CPI) are available
                        <Button onClick={handleModalOpen} style={button}>here</Button>
                      </p>
                    </div>
                  )
                )
              }
            >
              <IconButton onClick={handleTooltipOpen}>
                <img
                  src={cpiIcon}
                  height={21}
                  width={23}
                  alt="cpi-icon"
                />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        )
        : <></>}
    </Typography>
  );
};

export default CPIView;
