import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import TableView from '../Table/TableView';
import { setSelectedRows } from './TableService';

/**
* Updates table row when table state is changed 1. (paginated action) and 2. filter action
*/
const TableController = ((props) => {
  const { tblRows, table } = props;
  if (!tblRows) {
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
  const updateRows = setSelectedRows(tblRows, table);
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder,
  } = table;

  /**
  * client table aplhanumeric sorting for column table
  * uses string prototype function for sorting
  */
  const alphaNumericSort = (a, b) => `${a[sortBy]}`.localeCompare(
    `${b[sortBy]}`, undefined, {
      numeric: true,
      sensitivity: 'base',
    },
  );
  /**
  * sort base on table state
  */
  const sortRows = (a, b) => {
    if (sortOrder === 'asc') {
      return alphaNumericSort(a, b);
    }
    return alphaNumericSort(b, a);
  };
  const sortedRows = [...updateRows].sort((a, b) => sortRows(a, b));
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayRows = [...sortedRows].slice(startIndex, endIndex);

  return (
    <>
      <TableView
        {...props}
        tableRows={displayRows}
      />
    </>
  );
});

export default TableController;
