import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import TableHeader from './header/CustomTblHeader';
import CustomPagination from './pagination/CustomPagination';
import CustomTableBody from './body/CustomTblBody';
import CustomToolbar from './toolbar/CustomToolbar';
import DisplayErrMsg from './errMsg/DisplayErrMsg';
import ExtendedView from './ExtendedView';

const CustomTableContainer = (props) => {
  const { children, customTheme } = props;
  const themeConfig = createTheme({ overrides: { ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <TableContainer component={Paper}>
        {children}
      </TableContainer>
    </ThemeProvider>
  );
};

const TableView = ({
  tableRows = [],
  totalRows = [],
  table,
  onRowsPerPageChange,
  onPageChange,
  onRowSelectChange,
  onToggleSelectAll,
  totalRowCount,
  onSortByColumn,
  onColumnViewChange,
  themeConfig = {},
  queryVariables,
  server,
}) => (
  <>
    <ExtendedView
      table={table}
      rows={totalRows}
      server={server}
      onColumnViewChange={onColumnViewChange}
      onRowsPerPageChange={onRowsPerPageChange}
      onPageChange={onPageChange}
      numSelected={table?.selectedRows?.length || 0}
      customTheme={themeConfig.extendedView}
      queryVariables={queryVariables}
    />
    <CustomToolbar
      numSelected={table?.selectedRows?.length || 0}
      table={table}
      onColumnViewChange={onColumnViewChange}
      customTheme={themeConfig.toolbar}
    />
    <CustomTableContainer
      customTheme={themeConfig.tblContainer || {}}
    >
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
    </CustomTableContainer>
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
