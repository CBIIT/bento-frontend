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
  const {
    downloadCsv = 'download',
    downloadTable,
  } = download;

  return (
    <>
      <Tooltip
        title={downloadCsv}
        className="download-icon"
      >
        <IconButton
          onClick={downloadTable}
        >
          <CloudDownload />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DownloadButton;
