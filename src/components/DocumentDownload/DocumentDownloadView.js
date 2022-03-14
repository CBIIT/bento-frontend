import React from 'react';
import { useSelector } from 'react-redux';
import {
  withStyles,
} from '@material-ui/core';
import { ToolTip } from 'bento-components';
import { Link } from 'react-router-dom';
import env from '../../utils/env';
import CustomIcon from '../CustomIcon/CustomIconView';
import { jBrowseOptions } from '../../bento/jbrowseDetailData';
import { useGoogleAuth } from '../GoogleAuth/GoogleAuthProvider';
import globalData from '../../bento/siteWideConfig';
import SessionTimeOutModal from '../sessionTimeOutModal';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const fetchFileToDownload = (fileURL = '', signOut, setShowModal) => {
  fetch(`${FILE_SERVICE_API}${fileURL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
    .then((response) => {
      if (response.status === 403) {
        // sign out && open modal
        signOut();
        setShowModal(true);
        return '';
      }
      return response.text();
    }).then((filePath) => {
      if (filePath === '') {
        return;
      }
      // Create blob link to download
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute(
        'download',
        'fileURL',
      );

      // Append to html link element page
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
};

const DocumentDownload = ({
  classes,
  fileSize = 0,
  fileFormat = '',
  maxFileSize = 200000,
  toolTipTextUnauthenticated = 'Login to access this file',
  toolTipTextFileDownload = 'Download a copy of this file',
  toolTipTextFilePreview = 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
  toolTipTextFileViewer = 'Jbrowse file viewer',
  iconFileDownload = '',
  iconFilePreview = '',
  iconFileViewer = '',
  iconUnauthenticated = '',
  fileLocation = '',
  caseId = '',
}) => {
  const {
    signIn,
    signOut,
  } = useGoogleAuth();
  const isSignedIn = useSelector((state) => state.login.isSignedIn);
  const [showModal, setShowModal] = React.useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        { (globalData.enableAuthentication && !isSignedIn) ? (
          <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextUnauthenticated} arrow placement="bottom">
            <div
              style={{ textAlign: 'center' }}
              onClick={() => signIn()}
            >
              <CustomIcon imgSrc={iconUnauthenticated} />
            </div>
          </ToolTip>
        ) : (fileFormat === 'bam' || fileFormat === 'bai') && jBrowseOptions.jBrowse ? (
          <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextFileViewer} arrow placement="bottom">
            <Link
              to={`/fileViewer/${caseId}`}
            >
              <CustomIcon imgSrc={iconFileViewer} />
            </Link>
          </ToolTip>
        ) : fileSize < maxFileSize ? (
          <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextFileDownload} arrow placement="bottom">
            <div onClick={() => fetchFileToDownload(fileLocation, signOut, setShowModal)}>
              <CustomIcon imgSrc={iconFileDownload} />
            </div>
          </ToolTip>
        ) : (
          <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextFilePreview} arrow placement="bottom">
            <span>
              <CustomIcon imgSrc={iconFilePreview} />
            </span>
          </ToolTip>
        )}
        <SessionTimeOutModal
          open={showModal}
          closeModal={closeModal}
          handleClose={closeModal}
          submit={signIn}
          message="Please login to access files!"
        />
      </div>
    </>
  );
};

const styles = () => ({
  customTooltip: {
    border: '#03A383 1px solid',
  },
  customArrow: {
    '&::before': {
      border: '#03A383 1px solid',
    },
  },
});

export default withStyles(styles)(DocumentDownload);
