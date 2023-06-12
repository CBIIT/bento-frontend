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
  onColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  customTheme,
}) => {
  const { extendedViewConfig } = table;

  const {
    download = false,
    manageViewColumns = false,
    pagination = false,
  } = extendedViewConfig;

  if (!download || !manageViewColumns) {
    return null;
  }

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });

  return (
    <ThemeProvider theme={themeConfig}>
      <Toolbar
        className="downloadAndColumnView"
      >
        <DownloadButton
          download={download}
        />
        <ManageColumnView
          table={table}
          manageViewColumns={manageViewColumns}
          onColumnViewChange={onColumnViewChange}
        />
      </Toolbar>
      {
        (pagination) && (
          <CustomPagination
            customTheme={customTheme.tblTopPgn}
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
