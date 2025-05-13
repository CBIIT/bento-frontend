import React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  TablePagination,
  ThemeProvider,
} from '@material-ui/core';

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
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      SelectProps={{
        inputProps: {
          title: 'checkbox',
          'aria-label': 'checkbox',
        },
      }}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
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
