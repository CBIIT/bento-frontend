import React, { useReducer } from 'react';
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from '@material-ui/core';
import styles from './TableStyle';
import reducer from './state/Reducer';
import { onNumberOfRowsPerPageChange, onPageChange } from './state/Actions';

const TableView = ({
  tableRows,
  tab,
}) => {
  const { columns } = tab;

  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const initState = (initailState) => ({
    ...initailState,
    title: tab.name,
    rowsPerPage: 10,
    page: 0,
    sortBy: tab.defaultSortField,
    sortOrder: tab.defaultSortDirection,
    columns: tab.columns,
    rows: tableRows,
    // selectedRows: [],
  });

  const [table, dispatch] = useReducer(reducer, {}, initState);
  const handleChangeRowsPerPage = (event) => {
    const noOfRows = parseInt(event.target.value, 10);
    dispatch(onNumberOfRowsPerPageChange({ rowsPerPage: noOfRows }));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(onPageChange({ pageNumb: newPage }));
  };

  const onRowSelectHandler = (event, row) => {
    event.stopPropagation();
    console.log(row);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            {columns.map((column) => (
              <>
                <TableCell>
                  {column.header}
                </TableCell>
              </>
            ))}
          </TableHead>
          <TableBody>
            {tableRows.slice(table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage)
              .map((row) => (
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={(event) => onRowSelectHandler(event, row)}
                      checked={row.isChecked}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell>
                      { row[column.dataField] }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={table.rows.length}
        rowsPerPage={table.rowsPerPage}
        page={table.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default withStyles(styles)(TableView);
