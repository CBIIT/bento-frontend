import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Styles from './cartFooter.style';

const CartHeader = ({
  classes,
  placeholder,
  onChange,
}) => (
  <div className={classes.manifestTextarea}>
    <textarea
      id="multiline-user-coments"
      className={classes.textField}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default withStyles(Styles, { withTheme: true })(CartHeader);
