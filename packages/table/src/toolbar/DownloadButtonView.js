import React from 'react';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const DownloadButton = ({
  download,
}) => {
  if (!download) {
    return null;
  }

  return (
    <>
      <Tooltip title={download.downloadCsv}>
        <IconButton>
          <CloudDownload />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DownloadButton;
