import React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  TablePagination,
  ThemeProvider,
} from '@material-ui/core';
import DownloadButton from './components/DownloadButton';

const defaultTheme = {
  MuiTablePagination: {
    root: {
      paddingRight: '50px',
      borderTop: '3px solid #42779a',
    },
    toolbar: {
      minHeight: '45px',
    },
  },
  MuiTypography: {
    body2: {
      fontSize: '14px',
      textTransform: 'uppercase',
    },
    root: {
      fontSize: '14px',
    },
  },
  MuiIconButton: {
    root: {
      padding: '2px',
    },
  },
};

const downloadAreaStyle = {
  display: 'flex',
  borderTop: '1px solid #8A7F7C',
  borderBottom: '1px solid #8A7F7C',
  paddingRight: '41px',
};

const CustomPagination = ({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  customTheme = {},
  queryVariables,
  table,
}) => (
  <ThemeProvider theme={createTheme({ overrides: { ...defaultTheme, ...customTheme } })}>
    <div className="downloadArea" style={downloadAreaStyle}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        SelectProps={{
          inputProps: { 'aria-label': 'Selection dropdown for displaying the number of results per page' },
          native: true,
        }}
      />
      <DownloadButton
        count={count}
        queryVariables={queryVariables}
        table={table}
      />
    </div>
  </ThemeProvider>
);

CustomPagination.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
