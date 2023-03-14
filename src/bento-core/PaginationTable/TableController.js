import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import TableView from '../Table/TableView';
import { getTableData, setSelectedRows } from './TableService';

const TableController = ((props) => {
  const { tableData } = getTableData(props);
  if (!tableData) {
    return (
      <Container maxWidth="xl">
        <CircularProgress />
      </Container>
    );
  }
  /**
  * set selected row
  */
  const { table } = props;
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
