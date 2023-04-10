import React from 'react';
import {
  IconButton,
  ThemeProvider,
  Toolbar,
  Tooltip,
  createTheme,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons'
import CustomPagination from './pagination/CustomPagination';
import ManageColumnView from './toolbar/ManageColumnView';

const ExtendedView = ({
  table,
  onColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  themeConfig = {},
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
    return (
      <ThemeProvider theme={createTheme(customTheme)}>
        {(numSelected === 0 && (download || manageViewColumns)) && (
          <Toolbar className="downloadColumnView">
            {download && (
              <Tooltip title={download.downloadCsv}>
                <IconButton
                >
                  <CloudDownload />
                </IconButton>
              </Tooltip>
            )}
            {(manageViewColumns) && (
              <Tooltip title={manageViewColumns.title}>
                <ManageColumnView
                  table={table}
                  onColumnViewChange={onColumnViewChange}
                />
              </Tooltip>
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
