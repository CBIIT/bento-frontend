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
  deleteColumn,
  fileIDs,
  defaultSortCoulmn,
  defaultSortDirection,
  updateSortOrder,
}) => {
  function onRowSelectionChange(curr, allRowsSelected) {
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
        paginationAPIField="filesInList"
        paginationAPIFieldDesc="filesInListDesc"
        queryCustomVaribles={{ file_ids: fileIDs }}
        defaultSortCoulmn={defaultSortCoulmn}
        defaultSortDirection={defaultSortDirection}
        tableDownloadCSV={table.tableDownloadCSV}
        updateSortOrder={updateSortOrder}
      />
    </TableThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(CartHeader);
