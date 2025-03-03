import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  TablePagination,
  ThemeProvider,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowDropDown,
} from '@material-ui/icons';
import rightArrow from '../assets/rightArrow.svg';
import leftArrow from '../assets/leftArrow.svg';

const useStyles = makeStyles(() => ({
  paginationRoot: {
    display: 'flex',
    justifyContent: 'flex-end', // Moves pagination to the right
    paddingRight: '10px', // Optional spacing
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Align pagination buttons to the right
  },
}));

const defaultTheme = createMuiTheme({
  overrides: {
    MuiTablePagination: {
      root: {
        paddingRight: '50px',
        width: '100%',
      },
      toolbar: {
        minHeight: '45px',
        display: 'flex',
        alignItems: 'center',
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
  },
});

const CustomPagination = ({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const classes = useStyles();
  return (
    <ThemeProvider
      theme={createMuiTheme({ overrides: { ...defaultTheme.overrides } })}
    >
      <TablePagination
        labelRowsPerPage="Results per Page:"
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        SelectProps={{
          IconComponent: ArrowDropDown,
          inputProps: { 'aria-label': 'Selection dropdown for displaying the number of results per page' },
        }}
        nextIconButtonProps={{
          'aria-label': 'Next page',
        }}
        backIconButtonProps={{
          'aria-label': 'Previous page',
        }}
        ActionsComponent={() => (
          <div className={classes.actionsContainer}>
            <IconButton
              onClick={(event) => onPageChange(event, page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
            >
              <ArrowDropDown />
              <img src={leftArrow} style={{ opacity: page === 0 ? 0.2 : 1 }} alt="Left Arrow" />
            </IconButton>
            <IconButton
              onClick={(event) => onPageChange(event, page + 1)}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Next page"
            >
              <img src={rightArrow} style={{ opacity: page >= Math.ceil(count / rowsPerPage) - 1 ? 0.2 : 1 }} alt="Right Arrow" />
            </IconButton>
          </div>
        )}
      />
    </ThemeProvider>
  );
};

CustomPagination.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
