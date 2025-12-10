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
import DownloadButton from './toolbar/DownloadButtonView';
import ManageColumnView from './toolbar/ManageColumnView';
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

const downloadAreaStyle = {
  display: 'flex',
  borderTop: '1px solid #8A7F7C',
  paddingRight: '41px',
};

const cartDownloadAreaStyle = {
  display: 'flex',
  borderTop: '5px solid #e7e5e5',
  borderBottom: '3px solid #e7e5e5',
  paddingRight: '40px',
};

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
  onAllColumnViewChange,
  themeConfig = {},
  queryVariables,
}) => {
  const { extendedViewConfig } = table;
  const {
    manageViewColumns = false,
    download = false,
    downloadButtonConfig,
  } = extendedViewConfig;
  return (
    <>
      <ExtendedView
        table={table}
        onColumnViewChange={onColumnViewChange}
        onAllColumnViewChange={onAllColumnViewChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onPageChange={onPageChange}
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
      <div className="downloadArea" style={table.paginationAPIField === 'filesInList' ? cartDownloadAreaStyle : (table.paginationCustomStyle && table.paginationCustomStyle.bottomPagination) ? table.paginationCustomStyle.bottomPagination : downloadAreaStyle}>
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
        {
          manageViewColumns
          && (
            <ManageColumnView
              table={table}
              manageViewColumns={manageViewColumns}
              onColumnViewChange={onColumnViewChange}
              onAllColumnViewChange={onAllColumnViewChange}
            />
          )
        }
        {
          download
          && (
            <DownloadButton
              count={table.totalRowCount || 0}
              queryVariables={queryVariables}
              table={table}
              buttonConfig={downloadButtonConfig}
            />
          )
        }
      </div>
    </>
  );
};

export default TableView;
