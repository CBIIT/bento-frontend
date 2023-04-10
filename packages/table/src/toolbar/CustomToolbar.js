import React from 'react';
import PropTypes from 'prop-types';
import {
  createTheme,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ManageColumnView from './ManageColumnView';

const defaultTheme = {
  MuiToolbar: {
    root: {
      display: 'flex',
      zIndex: '120',
      minHeight: '25px',
      borderTop: '2px solid #e7e5e5',
      alignItems: 'center',
      paddingTop: '8px',
      paddingBottom: '8px',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
    },
    regular: {
      '@media (min-width: 600px)': {
        minHeight: '25px',
      },
    },
  },
};

const CustomToolbar = ({
  numSelected,
  onColumnViewChange,
  customTheme = {},
  table,
}) => (
  <ThemeProvider theme={createTheme({ overrides: { ...defaultTheme, ...customTheme } })}>
    {numSelected > 0 && (
      <Toolbar>
        <Typography
          component="div"
        >
          {`${numSelected} row(s) selected`}
        </Typography>
      </Toolbar>
    )}
    {(numSelected === 0 && table.manageViewColumns) && (
      <Tooltip title="View Columns">
        <ManageColumnView
          table={table}
          onColumnViewChange={onColumnViewChange}
        />
      </Tooltip>
    )}
  </ThemeProvider>
);

CustomToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default CustomToolbar;
