import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import {
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  withStyles,
} from '@material-ui/core';
import CopyIcon from '../assets/CopyIcon.svg';

const QueryUrl = ({
  classes,
  filterItems,
  localFind = {},
  rootPath,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleDisplay = () => setDisplay(!display);

  const [open, toggleOpen] = useState(false);

  const pathFilterParams = filterItems.reduce((acc, item) => {
    const { datafield, items = [] } = item;
    acc[datafield] = items;
    return acc;
  }, {});

  const query = JSON.stringify({
    ...pathFilterParams,
    ...localFind,
  });
  const url = encodeURI(rootPath.concat(query));

  const copyUrl = async () => {
    toggleOpen(!open);
    await navigator.clipboard.writeText(url);
  };

  const queryRef = useRef(null);

  return (
    <>
      <div ref={queryRef} className={classes.urlContainer}>
        <Button
          onClick={toggleDisplay}
          className={classes.viewLinkToggleBtn}
        >
          { (display) ? 'Hide Query URL' : 'Show Query URL'}
        </Button>
        {
          (display) && (
            <>
              <div
                type="button"
                className={clsx(classes.viewLink)}
              >
                {url}
              </div>
              <Tooltip
                arrow
                title="Copy to Clipboard"
              >
                <IconButton onClick={copyUrl} className={classes.copyIconBtn}>
                  <img src={CopyIcon} alt="copy icon" />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      </div>
      <Dialog
        open={open}
        onClose={() => toggleOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={clsx(classes.dialogBox, 'dialogBox')}
      >
        <DialogContent className={classes.okText}>
          <DialogContentText id="alert-dialog-description">
            Your query URL has been copied!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen(!open)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const styles = () => ({
  urlContainer: {
    display: 'flex',
    marginTop: '3px',
    minHeight: '10px',
  },
  viewLink: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0em',
    padding: '2px 5px',
    borderRadius: '5px',
    float: 'left',
    color: '#1D79A8',
    backgroundColor: '#fff',
    margin: '0',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    '@media (max-width: 2560px)': {
      maxWidth: '1800px',
    },
    '@media (max-width: 2000px)': {
      maxWidth: '1500px',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '1100px',
    },
    '@media (max-width: 1300px)': {
      maxWidth: '900px',
    },
  },
  urlViewBtn: {
    cursor: 'pointer',
  },
  viewLinkToggleBtn: {
    padding: '5px 10px 5px 10px',
    height: '20px',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0em',
    textAlign: 'left',
    backgroundColor: '#1D79A8',
    textTransform: 'none',
    color: '#fff',
    float: 'left',
    margin: '0px 10px 0px 0px',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#1D79A8',
      color: '#fff',
    },
  },
  copyIconBtn: {
    padding: '0px',
    height: '20px',
    marginLeft: '10px',
    float: 'left',
  },
});

export default withStyles(styles)(QueryUrl);
