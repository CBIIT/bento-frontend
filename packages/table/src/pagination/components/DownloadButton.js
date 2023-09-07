import React, { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
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
  queryVariables,
  table,
}) => {
  if (count === 0) {
    return <CloudDownload style={downloadButtonStyle} />;
  }

  const client = useApolloClient();

  async function downloadSCSVFile() {
    const {
      query,
      paginationAPIField,
    } = table;

    const result = await client.query({
      query,
      variables: {
        ...queryVariables,
        page: 0,
        first: 25000,
      },
    })
      .then((response) => {
        if (paginationAPIField && response && response.data) {
          return response.data[paginationAPIField];
        }
        return response.data;
      });
    console.log('result:', result);
  }

  const downloadTableCSV = useCallback(() => {
    downloadSCSVFile();
  }, [queryVariables]);

  return (
    <Tooltip title="Download filtered results as a CSV">
      <IconButton
        onClick={downloadTableCSV}
      >
        <CloudDownload />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
