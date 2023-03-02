import React from 'react';
import PropTypes from 'prop-types';
import {
  TablePagination,
  withStyles,
} from '@material-ui/core';

const CustomPagination = ({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <TablePagination
    rowsPerPageOptions={rowsPerPageOptions}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
  />
);

CustomPagination.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

const styles = () => ({
});

export default withStyles(styles)(CustomPagination);
