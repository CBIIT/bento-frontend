import React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  TablePagination,
  ThemeProvider,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

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

const downloadButtonStyle = {
  color: '#d1d2d3',
  marginTop: '7px',
};

const CustomPagination = ({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  customTheme = {},
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
      {
        count > 0
          ? (
            <Tooltip title="Download filtered results as a CSV">
              <IconButton>
                <CloudDownload />
              </IconButton>
            </Tooltip>
          )
          : <CloudDownload style={downloadButtonStyle} />
      }
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
