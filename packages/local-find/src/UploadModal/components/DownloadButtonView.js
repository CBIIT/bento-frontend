import React from 'react';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { downloadJson } from '../../utils/download';

const DownloadButton = ({
  download = true,
  classes,
  data,
  keysToInclude,
  headers,
}) => {
  if (!download) {
    return null;
  }
  const downloadFile = () => {
    console.log(data);
    console.log(keysToInclude);
    console.log(headers);
    const tableDownloadCSV = {
      keysToInclude,
      header: headers,
      fileName: 'test',
    };
    downloadJson(data, tableDownloadCSV);
  };

  return (
    <>
      <Tooltip title="download">
        <IconButton className={classes.downloadIcon} onClick={downloadFile}>
          <CloudDownload />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DownloadButton;
