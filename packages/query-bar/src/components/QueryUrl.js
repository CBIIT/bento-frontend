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
  localFind,
  rootPath,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleDisplay = () => setDisplay(!display);

  const [expand, setExpand] = useState(false);

  const [open, toggleOpen] = useState(false);

  const { autocomplete = [], upload } = localFind;

  const pathFilterParams = filterItems.reduce((acc, item) => {
    const { datafield, items = [] } = item;
    acc[datafield] = items;
    return acc;
  }, {});

  const query = JSON.stringify({
    ...pathFilterParams,
    autocomplete,
    upload,
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
        className={classes.dialogBox}
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

export default QueryUrl;
