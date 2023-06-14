import React from 'react';
import PropTypes from 'prop-types';
import MuiTable from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from './TablePagination';

export const defaultHeaderStyles = {
  root: {
    '@media print': {
      display: 'none',
    },
  },
};

class TableHeader extends React.Component {
  static propTypes = {};

  render() {
    const {
      options, rowCount, page, rowsPerPage, changeRowsPerPage, changePage, classes,
    } = this.props;

    return (
      <MuiTable className={classes.root}>
        {options.customFooter
          ? options.customFooter(
            rowCount,
            page,
            rowsPerPage,
            changeRowsPerPage,
            changePage,
            options.textLabels.pagination,
          )
          : options.pagination && (
          <TablePagination
            count={rowCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            component="div"
            options={options}
          />
          )}
      </MuiTable>
    );
  }
}

export default withStyles(defaultHeaderStyles, { name: 'MUIDataTableHeader' })(TableHeader);
