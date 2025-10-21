import React from 'react';
import {
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import CustomPagination from './pagination/CustomPagination';
import ManageColumnView from './toolbar/ManageColumnView';
import defaultTheme from './DefaultThemConfig';
import DownloadButton from './toolbar/DownloadButtonView';
import SearchBar from './toolbar/SearchBar';

const downloadAreaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid #8A7F7C',
  paddingRight: '48px',
  paddingLeft: '48px',
};

const rightSideContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
};

const ExtendedView = ({
  table,
  onColumnViewChange,
  onAllColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  customTheme,
  queryVariables,
}) => {
  const { extendedViewConfig } = table;
  if (!extendedViewConfig) {
    return null;
  }
  const {
    manageViewColumns = false,
    pagination = false,
    hasExport = true,
    searchBar = false,
  } = extendedViewConfig;

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      {/* {(numSelected === 0 && (download || manageViewColumns)) && (
      <Toolbar className="downloadColumnView">
         <DownloadButton
          download={download}
        />
      </Toolbar>
      )} */}
      {
          (pagination) && (
            <div className="downloadArea" style={downloadAreaStyle}>
              {searchBar && (
                <SearchBar />
              )}
              <div style={rightSideContainerStyle}>
                <CustomPagination
                  customTheme={customTheme.tblTopPgn}
                  rowsPerPageOptions={table.rowsPerPageOptions || [10, 25, 50, 100]}
                  component="div"
                  count={table.totalRowCount || 0}
                  rowsPerPage={table.rowsPerPage || 10}
                  page={table.page || 0}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  queryVariables={queryVariables}
                  table={table}
                />
                <ManageColumnView
                  table={table}
                  manageViewColumns={manageViewColumns}
                  onColumnViewChange={onColumnViewChange}
                  onAllColumnViewChange={onAllColumnViewChange}
                />
                {hasExport && (
                  <DownloadButton
                    count={table.totalRowCount || 0}
                    queryVariables={queryVariables}
                    table={table}
                  />
                )}
              </div>
            </div>
          )
        }
    </ThemeProvider>
  );
};

export default ExtendedView;
