/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable jsx-quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import styles from './Header.style';
import CustomTheme from './Header.theme.config';
import ReadMeComponent from '../Muiv5+/ReadMe/Dialog/DialogView';
import DownloadDropdownMenu from './components/download-dropdown-menu';
import IconQuestionDark from "./icons/icon_question_dark.svg";
import GenericIcon from "./icons/generic_icon.png";
import { useModelContext } from '../../../state/NavContextProvider';

const HeaderComponent = ({
  classes,
}) => {
  /**
  * use context access data model state
  */
  const { context } = useModelContext();
  if (Object.keys(context || {}).length === 0) {
    return <CircularProgress />;
  }
  const {
    versionInfo,
    pdfDownloadConfig = {},
    pageConfig,
    readMeConfig: config,
    dictionary: fullDictionary,
    filterDictionary: dictionary = {},
  } = context;
  const modelVersion = versionInfo?.version || 'unknown';

  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  // const config = useSelector((state) => (state.submission && state.submission.readMeConfig
  // ? state.submission.readMeConfig : undefined));
  // const pageConfig = useSelector((state) => (state.submission && state.submission.pageConfig ? state.submission.pageConfig : undefined));
  // const loadingExampleConfig = useSelector((state) => (state.submission && state.submission.loadingExampleConfig ? state.submission.loadingExampleConfig : undefined));
  // const modelVersion = useSelector((state) => state.versionInfo && state.versionInfo.modelVersion ? state.versionInfo.modelVersion : undefined);

  useEffect(() => {
    if (config && config.readMeUrl) {
      axios.get(config.readMeUrl).then((response) => response).then((resp) => {
        if (resp.data) {
          setContent(resp.data);
        }
      });
    }
  }, []);

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  return (
    <>
      <CustomTheme>
        <div
          className={classes.titleContainer}
        >
          <div
            className={classes.logoAndTitle}
          >
            <img
              className={classes.dogIcon}
              alt="Model Icon"
              src={pageConfig?.iconSrc || GenericIcon}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = GenericIcon;
              }}
            />
            <div className={classes.titleAndVersion}>
              <h2
                className={modelVersion ? clsx(classes.title, classes.titleWithVersion) : classes.title}
              >
                {pageConfig?.title || "Data Model Navigator"}
              </h2>
              {modelVersion && (<span className={classes.modelVersion}>Version {modelVersion}</span>)}
            </div>
          </div>

          <div
            className={classes.btnGroup}
          >
            {typeof (config?.readMeUrl) === "string" && (
              <Button
                classes={{
                  root: classes.readMeBtnRoot,
                  label: classes.readMeBtnLabel,
                }}
                variant="outlined"
                color="primary"
                onClick={displayReadMeHandler}
                endIcon={(
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      color: "#0F4C91"
                    }}
                    alt="readme btn icon"
                    src={IconQuestionDark}
                  />
                )}
                disableRipple
              >
                README
              </Button>
            )}
            {pdfDownloadConfig.enabled && (
              <DownloadDropdownMenu
                config={{ ...pdfDownloadConfig, type: 'document' }}
                filteredDictionary={dictionary}
                fullDictionary={fullDictionary}
                readMeContent={content}
              />
            )}
          </div>
          <ReadMeComponent
            content={content}
            config={config}
            display={displayReadMe}
            displayReadMeDialog={displayReadMeHandler}
          />
        </div>
        <hr className={classes.divider} />
      </CustomTheme>
    </>

  );
};

export default withStyles(styles)(HeaderComponent);
