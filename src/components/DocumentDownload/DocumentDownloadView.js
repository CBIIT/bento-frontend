import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { ToolTip } from 'bento-components';
import { Link } from 'react-router-dom';
import env from '../../utils/env';
import CustomIcon from '../CustomIcon/CustomIconView';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const fetchFileToDownload = (fileURL = '') => {
  fetch(`${FILE_SERVICE_API}${fileURL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
    .then((response) => response.text())
    .then((filePath) => {
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
  toolTipTextFileDownload = 'Download a copy of this file',
  toolTipTextFilePreview = 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
  toolTipTextFileViewer = 'Jbrowse file viewer',
  iconFileDownload = '',
  iconFilePreview = '',
  iconFileViewer = '',
  fileLocation = '',
  caseId = '',
}) => (
  <>
    { fileFormat === 'bam' || fileFormat === 'bai' ? (
      <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextFileViewer} arrow placement="bottom">
        <Link
          to={`/fileViewer/${caseId}`}
        >
          <CustomIcon imgSrc={iconFileViewer} />
        </Link>
      </ToolTip>
    ) : fileSize < maxFileSize ? (
      <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextFileDownload} arrow placement="bottom">
        <div onClick={() => fetchFileToDownload(fileLocation)}>

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
  </>
);

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
