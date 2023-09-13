import React, { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { downloadJson } from '../util/downloadTable';

const downloadButtonStyle = {
  color: '#d1d2d3',
  marginTop: '7px',
};

const DownloadButton = ({
  count,
  queryVariables,
  table,
}) => {
  if (table.paginationAPIField === 'filesInList') {
    return <></>;
  }
  if (count === 0) {
    return <CloudDownload className="disableButton" style={downloadButtonStyle} />;
  }

  const client = useApolloClient();

  const downloadFile = 'CCDI Inventory ';

  async function downloadSCSVFile() {
    const {
      query,
      paginationAPIField,
    } = table;

    const downloadFileName = downloadFile.concat(paginationAPIField.replace('Overview', ''), ' download');

    const result = await client.query({
      query,
      variables: {
        ...queryVariables,
        page: 0,
        first: 10000,
      },
    })
      .then((response) => {
        if (paginationAPIField && response && response.data) {
          return response.data[paginationAPIField];
        }
        return response.data;
      });
    downloadJson(result, table, downloadFileName);
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
