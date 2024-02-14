import React, { useState, useEffect, useRef } from 'react';
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

const ViewFullLinkComponent = ({
  classes,
  url,
  maxWidth = 1200,
}) => {
  const linkRef = useRef(null);
  const [expandLink, setExpand] = useState(false);

  /**
   * Compute url link width based on the windowsize
   */
  useEffect(() => {
    const urlWidth = linkRef?.current?.offsetWidth;
    if (urlWidth > maxWidth / 2) {
      setExpand(true);
    }
  }, []);

  const expandUrl = () => {
    setExpand(!expandLink);
  };

  return (
    <>
      <span ref={linkRef} className={classes.link}>
        <span
          className={clsx(classes.viewLink,
            { [classes.collapseLink]: expandLink })}
        >
          <span className={classes.urlView}>
            {url}
          </span>
          {(expandLink) && (
            <span
              className={classes.expandLinkBtn}
              type="button"
              onClick={expandUrl}
            >
              ...
            </span>
          )}
        </span>
      </span>
    </>
  );
};

const QueryUrl = ({
  classes,
  filterItems,
  localFind = {},
  rootPath,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleDisplay = () => setDisplay(!display);

  const [expand, setExpand] = useState(false);

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
              {(expand) ? (
                <span
                  type="button"
                  onClick={() => setExpand(!expand)}
                  className={clsx(classes.link, classes.viewLink, classes.expandLink)}
                >
                  {url}
                </span>
              ) : (
                <ViewFullLinkComponent
                  url={url}
                  classes={classes}
                  maxWidth={queryRef?.current?.offsetWidth}
                />
              )}
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
    marginTop: '10px',
    minHeight: '10px',
  },
  link: {
    lineBreak: 'anywhere',
    overflow: 'hidden',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0em',
    padding: '5px',
    borderRadius: '5px',
    float: 'left',
    color: '#1D79A8',
    backgroundColor: '#fff',
    maxWidth: '80%',
  },
  viewLink: {
    margin: '0',
  },
  collapseLink: {
    maxHeight: '1em',
    display: 'block',
    // display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '1',
    overflow: 'hidden',
  },
  expandLink: {
    cursor: 'pointer',
  },
  expandLinkBtn: {
    float: 'left',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  viewLinkToggleBtn: {
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
    '&:hover': {
      backgroundColor: '#1D79A8',
      color: '#fff',
    },
  },
  urlView: {
    float: 'left',
    width: 'calc(100% - 13px)',
    minWidth: '840px',
    '@media (max-width: 2560px)': {
      maxWidth: '1800px',
    },
    '@media (max-width: 2000px)': {
      maxWidth: '1400px',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '1200px',
    },
    '@media (max-width: 1300px)': {
      maxWidth: '1050px',
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
