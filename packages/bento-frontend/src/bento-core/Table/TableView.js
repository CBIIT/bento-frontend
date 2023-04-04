import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
} from '@material-ui/core';
import TableHeader from './header/CustomTblHeader';
import CustomPagination from './pagination/CustomPagination';
import CustomTableBody from './body/CustomTblBody';
import CustomToolbar from './toolbar/CustomToolbar';
import DisplayErrMsg from './errMsg/DisplayErrMsg';

const TableView = ({
  tableRows = [],
  table,
  onRowsPerPageChange,
  onPageChange,
  onRowSelectChange,
  onToggleSelectAll,
  totalRowCount,
  onSortByColumn,
  onColumnViewChange,
  viewConfig = {},
  themeConfig = {},
}) => (
  <>
    {viewConfig.displayHeaderPg && (
      <CustomPagination
        customTheme={themeConfig.tblTopPgn}
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={table.totalRowCount || 0}
        rowsPerPage={table.rowsPerPage || 10}
        page={table.page || 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    )}
    <CustomToolbar
      numSelected={table.selectedRows.length}
      table={table}
      onColumnViewChange={onColumnViewChange}
      customTheme={themeConfig.toolbar}
    />
    <TableContainer component={Paper}>
      <Table>
        <TableHeader
          customTheme={themeConfig.tblHeader}
          table={table}
          rows={tableRows}
          count={totalRowCount}
          toggleSelectAll={onToggleSelectAll}
          sortByColumn={onSortByColumn}
        />
        <CustomTableBody
          customTheme={themeConfig.tblBody}
          rows={tableRows}
          table={table}
          onRowSelectChange={onRowSelectChange}
        />
      </Table>
    </TableContainer>
    {tableRows.length === 0 && (
      <DisplayErrMsg
        customTheme={themeConfig.displayErr}
        table={table}
      />
    )}
    <CustomPagination
      customTheme={themeConfig.tblPgn}
      rowsPerPageOptions={[10, 25, 50, 100]}
      component="div"
      count={table.totalRowCount || 0}
      rowsPerPage={table.rowsPerPage || 10}
      page={table.page || 0}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  </>
);

export default TableView;
