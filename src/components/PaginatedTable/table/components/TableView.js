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
import TableHeader from './header/CustomHeader';
import CustomPagination from './pagination/CustomPagination';

const pgTopThemeConfig = {
  overrides: {
    MuiTablePagination: {
      root: {
        borderTop: '3px solid #42779a',
        borderBottom: '3px solid #42779a',
      },
    },
    MuiTypography: {
      body2: {
        fontSize: '14px',
        textTransform: 'uppercase',
      },
      root: {
        fontSize: '14px',
      },
    },
  },
};

const tblHeaderThemeConfig = {
  overrides: {
    MuiTableHead: {
      root: {
        fontWeight: '400',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
      },
    },
    MuiTableCell: {
      root: {
        padding: '5px',
        color: '#13344A',
        cursor: 'pointer',
        verticalAlign: 'top',
      },
    },
    MuiTableSortLabel: {
      root: {
        color: '#13344A',
        position: 'relative',
        fontSize: '11pt',
        fontFamily: 'Lato Regular,Raleway, sans-serif',
        fontWeight: 'bold',
        paddingLeft: '20px',
        letterSpacing: '0.06em',
        '&.sample_procurement_method': {
          minWidth: '200px',
        },
      },
    },
    MuiTableRow: {
      head: {
        height: '40px',
        borderBottom: '3px solid #42779a',
      },
      root: {
      },
    },
  },
};

const TableView = ({
  tableRows,
  table,
  onRowsPerPageChange,
  onPageChange,
  onRowSelectChange,
  onToggleSelectAll,
  onSortByColumn,
  columnOptions,
}) => (
  <>
    <CustomPagination
      themeConfig={pgTopThemeConfig}
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
          themeConfig={tblHeaderThemeConfig}
          table={table}
          rows={tableRows}
          columnOptions={columnOptions}
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
