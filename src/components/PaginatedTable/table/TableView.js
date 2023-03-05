import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
} from '@material-ui/core';
import TableHeader from '../../../bento-core/Table/header/CustomTblHeader';
import CustomPagination from '../../../bento-core/Table/pagination/CustomPagination';
import CustomTableBody from '../../../bento-core/Table/body/CustomTblBody';
import {
  pgBottomThemeConfig,
  pgTopThemeConfig,
  tblBodyThemeConfig,
  tblHeaderThemeConfig,
} from './TableThemeConfig';

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
        <CustomTableBody
          themeConfig={tblBodyThemeConfig}
          rows={tableRows}
          table={table}
          onRowSelectChange={onRowSelectChange}
        />
      </Table>
    </TableContainer>
    <CustomPagination
      themeConfig={pgBottomThemeConfig}
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
