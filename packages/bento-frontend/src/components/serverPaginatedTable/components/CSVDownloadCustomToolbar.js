import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ToolTip } from 'bento-components';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core/styles';
import client from '../../../utils/graphqlClient';
import { downloadJson } from './utils';

const defaultToolbarStyles = {
  iconButton: {
  },
};

const CustomToolbar = ({
  classes, tableDownloadCSV, queryCustomVaribles,
}) => {
  async function fetchData() {
    const fetchResult = await client
      .query({
        query: tableDownloadCSV.query,
        variables: {
          first: 10000,
          ...queryCustomVaribles,
        },
      })
      .then((result) => result.data[tableDownloadCSV.apiVariable]);
    return fetchResult;
  }

  async function prepareDownload() {
    const apiReturnedData = await fetchData();
    return downloadJson(
      apiReturnedData,
      tableDownloadCSV,
    );
  }

  return (
    <>
      <ToolTip title="Download Full Table As CSV">
        <IconButton
          className={classes.iconButton}
          onClick={() => prepareDownload(tableDownloadCSV)}
        >
          <DownloadIcon className={classes.downloadIcon} />
        </IconButton>
      </ToolTip>
    </>
  );
};

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar);
