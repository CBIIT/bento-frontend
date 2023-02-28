import React from 'react';
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
import { updateRowState } from './service/TableService';

const TableView = ({
  tableRows,
  table,
  onRowsPerPageChange,
  onPageChange,
  onRowSelectChange,
}) => {
  /**
  * Update selected rows
  */
  const updateRows = updateRowState(tableRows, table);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            {table.columns.map((column) => (
              <>
                <TableCell>
                  {column.header}
                </TableCell>
              </>
            ))}
          </TableHead>
          <TableBody>
            {updateRows.slice(table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage)
              .map((row) => (
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={(event) => onRowSelectChange(event, row)}
                      checked={row.isChecked}
                    />
                  </TableCell>
                  {table.columns.map((column) => (
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
        count={table.totalRowCount}
        rowsPerPage={table.rowsPerPage}
        page={table.page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
};

export default withStyles(styles)(TableView);
