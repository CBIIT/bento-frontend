import React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  TablePagination,
  ThemeProvider,
} from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

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
  hasExport = true,
}) => (
  <ThemeProvider theme={createTheme({ overrides: { ...defaultTheme, ...customTheme } })}>
    <TablePagination
      labelRowsPerPage="Results per Page:"
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelDisplayedRows={({ from, to }) => `${from.toLocaleString()}-${to.toLocaleString()} of ${count.toLocaleString()}`}
      SelectProps={{
        IconComponent: KeyboardArrowDownOutlinedIcon,
        inputProps: { 'aria-label': 'Selection dropdown for displaying the number of results per page' },
      }}
      style={!hasExport ? { position: 'relative', left: '50px' } : {}}
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
