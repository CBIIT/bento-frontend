import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import {
  getColumns, getOptions, getDefaultCustomFooter,
} from 'bento-components';
import _ from 'lodash';
import CustomDataTable from '../../../../components/serverPaginatedTable/serverPaginatedTable';
import Styles from './cartBody.style';
import {
  table, GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC,
} from '../../../../bento/fileCentricCartWorkflowData';
import TableThemeProvider from './cartTableThemeConfig';

const CartHeader = ({
  classes,
  data,
  fileIDs,
  deleteColumn,
  ...rest
}) => {
  function onRowSelectionChange(curr, allRowsSelected) {
    // eslint-disable-next-line no-sequences
    return (curr, allRowsSelected);
  }

  const columns = getColumns(table, classes).concat(deleteColumn);
  const options = getOptions(table, classes, getDefaultCustomFooter, onRowSelectionChange);

  return (
    <TableThemeProvider>
      <CustomDataTable
        data={_.cloneDeep(data)}
        columns={columns}
        options={options}
        className={classes.tableStyle}
        count={fileIDs.length || 0}
        overview={GET_MY_CART_DATA_QUERY}
        overviewDesc={GET_MY_CART_DATA_QUERY_DESC}
        queryCustomVaribles={{ file_ids: fileIDs }}
        tableDownloadCSV={table.tableDownloadCSV}
        {...rest}
      />
    </TableThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(CartHeader);
