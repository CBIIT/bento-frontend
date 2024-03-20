import React, { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { downloadJson } from '../util/downloadTable';

const DownloadButton = ({
  download,
  rows,
  table,
  queryVariables,
  server,
}) => {
  if (!download) {
    return null;
  }
  const {
    downloadCsv = 'download',
    downloadTable,
    downloadFileName,
  } = download;

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
    if (downloadTable) {
      downloadTable();
    } else if (!downloadTable && !server) {
      downloadJson(rows, table, downloadFileName);
    } else {
      downloadSCSVFile();
    }
  }, [queryVariables]);

  return (
    <>
      <Tooltip
        title={downloadCsv}
        className="download-icon"
      >
        <IconButton
          onClick={downloadTableCSV}
        >
          <CloudDownload />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DownloadButton;
