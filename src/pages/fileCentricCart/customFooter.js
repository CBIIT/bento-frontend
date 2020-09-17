import React from 'react';
import { Link } from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import externalIcon from '../../assets/cart/ExternalLink.svg';

const defaultFooterStyles = {
  link: {
    color: '#dc762f',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#dc762f',
    },
  },
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  message: {
    color: '#000000',
    fontSize: '15px',
    fontFamily: '"Open Sans", sans-serif',
    lineHeight: '22px',
    marginTop: '-8px',
    marginBottom: '5px',
  },
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
    <TableRow className={classes.comment}>
      <div>
        <div className={classes.message}>
          <span>
            To access and analyze files: select and remove unwanted files,
            click the “Download Manifest” button, and upload the resulting
            Manifest file to your
            {' '}
            <Link target="_blank" className={classes.link} href="http://www.cancergenomicscloud.org/">
              Seven Bridges Genomics
            </Link>
            <img
              src={externalIcon}
              alt="outbounnd web site icon"
              className={classes.linkIcon}
            />
            {' '}
            account.
          </span>
        </div>
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
      </div>
    </TableRow>
    <TableRow />
  </TableFooter>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(CustomFooter);
