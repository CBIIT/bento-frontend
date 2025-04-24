import React, { useEffect } from 'react';
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
import DownloadButton from './toolbar/DownloadButtonView';
import ManageColumnView from './toolbar/ManageColumnView';

const CustomTableContainer = (props) => {
  const { children, customTheme } = props;
  const themeConfig = createTheme({ overrides: { ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <TableContainer id="tableContainer" component={Paper}>
        {children}
      </TableContainer>
    </ThemeProvider>
  );
};

const downloadAreaStyle = {
  display: 'flex',
  borderTop: '1px solid #8A7F7C',
  borderBottom: '1px solid #8A7F7C',
  paddingRight: '41px',
};

const cartDownloadAreaStyle = {
  display: 'flex',
  borderTop: '5px solid #e7e5e5',
  borderBottom: '3px solid #e7e5e5',
  paddingRight: '40px',
};

const addScrollContainerStyle = {
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100%',
  height: '14px',
};

const addScrollStyle = {
  height: '14px',
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
  themeConfig = {},
  queryVariables,
  navigation,
}) => {
  useEffect(() => {
    const tableContainer = document.getElementById('tableContainer');
    const addScrollContainer = document.getElementById('addScrollContainer');
    const targetTable = tableContainer.firstChild;
    const addScroll = addScrollContainer.firstChild;
    const tableWidth = targetTable.clientWidth;
    addScroll.style.width = `${tableWidth}px`;
    tableContainer.onscroll = () => {
      addScrollContainer.scrollLeft = tableContainer.scrollLeft;
    };
    addScrollContainer.onscroll = () => {
      tableContainer.scrollLeft = addScrollContainer.scrollLeft;
    };
    if (!(tableWidth > tableContainer.clientWidth)) {
      addScrollContainer.style.height = '0px';
    }
  });
  const { extendedViewConfig } = table;
  const {
    manageViewColumns = false,
    hasExport = true,
  } = extendedViewConfig;
  return (
    <>
      <ExtendedView
        table={table}
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
            navigation={navigation}
          />
        </Table>
      </CustomTableContainer>
      <div id="addScrollContainer" style={addScrollContainerStyle}>
        <div style={addScrollStyle} />
      </div>
      {tableRows.length === 0 && (
        <DisplayErrMsg
          customTheme={themeConfig.displayErr}
          table={table}
        />
      )}
      <div className="downloadArea" style={table.paginationAPIField === 'filesInList' ? cartDownloadAreaStyle : downloadAreaStyle}>
        <CustomPagination
          customTheme={themeConfig.tblPgn}
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={table.totalRowCount || 0}
          rowsPerPage={table.rowsPerPage || 10}
          page={table.page || 0}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          hasExport={hasExport}
        />
        {hasExport && (
          <DownloadButton
            count={table.totalRowCount || 0}
            queryVariables={queryVariables}
            table={table}
          />
        )}
        <ManageColumnView
          table={table}
          manageViewColumns={manageViewColumns}
          onColumnViewChange={onColumnViewChange}
        />
      </div>
    </>
  );
};

export default TableView;
