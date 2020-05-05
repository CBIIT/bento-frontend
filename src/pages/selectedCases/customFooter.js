import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  buttonRoot: {
    background: '#C53B27',
    '&:hover': {
      background: '#C53B27',
    },
    borderRadius: '35px',
    fontSize: '13px',
    fontFamily: 'raleway',
    fontWeight: '600',
    lineHeight: '19px',
    textAlign: 'center',
    height: '40px',
    width: '165px',
    color: '#FFFF',
    '&$buttonDisabled': {
      backgroundColor: '#C53B27',
      opacity: '0.3',
      border: '3px solid grey',
      color: '#FFFF',
      fontWeight: '600',
      fontFamily: 'raleway',
      fontSize: '13px',
      lineHeight: '11px',
      textAlign: 'center',
    },
  },
  buttonDisabled: {

  },
});

const linkStyle = {
  textDecoration: 'none',
  cursor: 'auto',
};

const CustomFooter = ({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  text,
}) => (
  <TableFooter>
    <TableRow>
      <TableCell>
        <Link to={count > 0 && 'mycasesfiles'} style={linkStyle}>
          <Button disabled={count < 1} variant="contained" color="primary" classes={{ root: classes.buttonRoot, disabled: classes.buttonDisabled }}>
            {text}
          </Button>
        </Link>
      </TableCell>
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

export default withStyles(styles)(CustomFooter);
