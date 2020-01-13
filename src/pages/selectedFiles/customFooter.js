import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const defaultFooterStyles = {

};

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  label,
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
    <TableRow>
      <TextField
        id="multiline-user-coments"
        label={label}
        multiline
        rows={6}
        style={{ minWidth: '500px' }}
        className={classes.textField}
        margin="dense"
        variant="filled"
      />
    </TableRow>
    <TableRow />
  </TableFooter>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(CustomFooter);
