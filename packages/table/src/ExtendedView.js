import React from 'react';
import {
  ThemeProvider,
  Toolbar,
  createTheme,
} from '@material-ui/core';
import CustomPagination from './pagination/CustomPagination';
import ManageColumnView from './toolbar/ManageColumnView';
import defaultTheme from './DefaultThemConfig';
import DownloadButton from './toolbar/DownloadButtonView';

const ExtendedView = ({
  table,
  rows,
  onColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  customTheme,
  queryVariables,
  server,
}) => {
  const { extendedViewConfig, rowsPerPageOptions } = table;
  if (!extendedViewConfig) {
    return null;
  }

  const {
    download = false,
    manageViewColumns = false,
    pagination = false,
  } = extendedViewConfig;

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });

  return (
    <ThemeProvider theme={themeConfig}>
      {(download || manageViewColumns) && (
        <Toolbar
          className="downloadAndColumnView"
        >
          <DownloadButton
            download={download}
            rows={rows}
            server={server}
            table={table}
            queryVariables={queryVariables}
          />
          <ManageColumnView
            table={table}
            manageViewColumns={manageViewColumns}
            onColumnViewChange={onColumnViewChange}
          />
        </Toolbar>
      )}
      {
        (pagination) && (
          <CustomPagination
            customTheme={customTheme.tblTopPgn}
            rowsPerPageOptions={rowsPerPageOptions || [10, 25, 50, 100]}
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={table.totalRowCount || 0}
            rowsPerPage={table.rowsPerPage || 10}
            page={table.page || 0}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        )
      }
    </ThemeProvider>
  );
};

export default ExtendedView;
