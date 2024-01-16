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

const downloadAreaStyle = {
  display: 'flex',
  paddingRight: '41px',
  float: 'right',
};

const ExtendedView = ({
  table,
  onColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  numSelected = 0,
  customTheme,
  queryVariables,
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
        {/* <DownloadButton
          download={download}
        /> */}
        <ManageColumnView
          table={table}
          manageViewColumns={manageViewColumns}
          onColumnViewChange={onColumnViewChange}
        />
      </Toolbar>
      )}
      {
          (pagination) && (
            <div className="downloadArea" style={downloadAreaStyle}>
              <CustomPagination
                customTheme={customTheme.tblTopPgn}
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={table.totalRowCount || 0}
                rowsPerPage={table.rowsPerPage || 10}
                page={table.page || 0}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                queryVariables={queryVariables}
                table={table}
              />
              <DownloadButton
                count={table.totalRowCount || 0}
                queryVariables={queryVariables}
                table={table}
              />
            </div>
          )
        }
    </ThemeProvider>
  );
};

export default ExtendedView;
