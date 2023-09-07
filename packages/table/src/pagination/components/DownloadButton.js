import React from 'react';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const downloadButtonStyle = {
  color: '#d1d2d3',
  marginTop: '7px',
};

const DownloadButton = ({
  count,
}) => {
  if (count === 0) {
    return <CloudDownload style={downloadButtonStyle} />;
  }

  return (
    <Tooltip title="Download filtered results as a CSV">
      <IconButton>
        <CloudDownload />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
