import React from 'react';
import {
  IconButton,
  ThemeProvider,
  Toolbar,
  Tooltip,
  createTheme,
} from '@material-ui/core';
import {
  CloudDownload,
} from '@material-ui/icons';
import CustomPagination from './pagination/CustomPagination';
import ManageColumnView from './toolbar/ManageColumnView';
import defaultTheme from './DefaultThemConfig';
import DownloadButton from './toolbar/DownloadButtonView';

const ExtendedView = ({
  table,
  onColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  numSelected = 0,
  customTheme,
}) => {
    const { extendedViewConfig } = table;
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
        {(numSelected === 0 && (download || manageViewColumns)) && (
          <Toolbar className="downloadColumnView">
            <DownloadButton
              download={download}
            />
            {(manageViewColumns) && (
              // <Tooltip title={manageViewColumns.title}>
              <ManageColumnView
                table={table}
                manageViewColumns={manageViewColumns}
                onColumnViewChange={onColumnViewChange}
              />
              // </Tooltip>
            )}
          </Toolbar>
        )}
        {
          (pagination) && (
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
          )
        }
       </ThemeProvider>
    );
};

export default ExtendedView;
