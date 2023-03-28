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
import DisplayErrMsg from './util/DisplayErrMsg';

const TableView = ({
  tableRows = [],
  table,
  onRowsPerPageChange,
  onPageChange,
  onRowSelectChange,
  onToggleSelectAll,
  onSortByColumn,
  viewConfig = {},
  themeConfig = {},
}) => (
  <>
    {viewConfig.displayHeaderPg && (
      <CustomPagination
        customTheme={themeConfig.tblTopPgn}
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={table.totalRowCount}
        rowsPerPage={table.rowsPerPage}
        page={table.page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    )}
    <CustomToolbar
      numSelected={table.selectedRows.length}
      customTheme={themeConfig.toolbar}
    />
    <TableContainer component={Paper}>
      <Table>
        <TableHeader
          customTheme={themeConfig.tblHeader}
          table={table}
          rows={tableRows}
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
        table={table}
      />
    )}
    <CustomPagination
      customTheme={themeConfig.tblPgn}
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

export default TableView;
