import React, { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  IconButton,
  Tooltip,
  Button,
} from '@material-ui/core';
// import ToolTip from '@bento-core/tool-tip';
import { CloudDownload } from '@material-ui/icons';
import { downloadJson } from '../util/downloadTable';

const downloadButtonStyle = {
  color: '#d1d2d3',
  marginTop: '7px',
};

// Default style for Download Button with Text.
const DEFAULT_BUTTON_STYLE = {
  width: '223px',
  height: '41px',
  borderRadius: '5px',
  backgroundColor: '#2A6E93',
  color: '#fff',
  marginTop: '10px',
  fontFamily: 'poppins',
  '& #cloudIcon': {
    margin: '10px',
    marginTop: '6px',
  },
};

const DownloadButton = ({
  count,
  queryVariables,
  table,
  buttonConfig = {},
  isIcon = false,
}) => {
  if (table.paginationAPIField === 'filesInList') {
    return <></>;
  }
  if (count === 0) {
    return <CloudDownload className="disableButton" style={downloadButtonStyle} />;
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
        first: 10000,
      },
    })
      .then((response) => {
        if (paginationAPIField && response && response.data) {
          return response.data[paginationAPIField];
        }
        return response.data;
      });
    downloadJson(result, table, table.downloadFileName);
  }

  const downloadTableCSV = useCallback(() => {
    downloadSCSVFile();
  }, [queryVariables]);

  const {
    buttonStyle, title = 'DOWNLOAD CSV', cloudIcon = false,
  } = buttonConfig;

  return isIcon ? (
    <Tooltip title="Download filtered results as a CSV">
      <IconButton
        onClick={downloadTableCSV}
      >
        <CloudDownload />
      </IconButton>
    </Tooltip>
  ) : (
    <>
      <Button
        onClick={downloadTableCSV}
        style={buttonStyle || DEFAULT_BUTTON_STYLE}
        disableRipple
      >
        {title}
        {' '}
        {cloudIcon ? <CloudDownload style={{ margin: '6px 0px 10px 10px' }} /> : ''}
      </Button>
    </>
  );
};

export default DownloadButton;
