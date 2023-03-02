import React from 'react';
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles,
} from '@material-ui/core';
import styles from './TableStyle';
import TableHeader from './CustomHeader';
import CustomPagination from './CustomPagination';

const TableView = ({
  tableRows,
  table,
  onRowsPerPageChange,
  onPageChange,
  onRowSelectChange,
  onToggleSelectAll,
  onSortByColumn,
}) => (
  <>
    <CustomPagination
      rowsPerPageOptions={[10, 25, 50, 100]}
      component="div"
      count={table.totalRowCount}
      rowsPerPage={table.rowsPerPage}
      page={table.page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
    <TableContainer component={Paper}>
      <Table>
        <TableHeader
          table={table}
          rows={tableRows}
          toggleSelectAll={onToggleSelectAll}
          sortByColumn={onSortByColumn}
        />
        <TableBody>
          {tableRows
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
    <CustomPagination
      rowsPerPageOptions={[10, 25, 50, 100]}
      component="div"
      count={table.totalRowCount}
      rowsPerPage={table.rowsPerPage}
      page={table.page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  </>
);

export default withStyles(styles)(TableView);
