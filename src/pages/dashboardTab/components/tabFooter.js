import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

const defaultFooterStyles = {
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
};

const TabFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        className={classes.root}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableRow>
  </TableFooter>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(TabFooter);
