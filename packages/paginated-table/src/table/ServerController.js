import React from 'react';
import {
  CircularProgress,
  Container,
} from '@material-ui/core';
import { TableView } from '@bento-core/table';
import {
  getTableData,
  setSelectedRows,
} from './TableService';

/**
* Updates table row when table state is changed 1. (paginated action) and 2. filter action
*/
const TableController = ((props) => {
  const { queryVariables, table, totalRowCount } = props;

  /** if empty return table */
  if (totalRowCount < 1) {
    return (
      <TableView
        {...props}
      />
    );
  }

  const { tableData } = getTableData({ queryVariables, table });
  if (!tableData) {
    return (
      <Container maxWidth="xl">
        <CircularProgress />
      </Container>
    );
  }
  /**
  * update rows
  * set selected rows isChecked to TRUE
  */
  const updateRows = setSelectedRows(tableData, table);
  return (
    <>
      <TableView
        {...props}
        tableRows={updateRows}
      />
    </>
  );
});

export default TableController;
