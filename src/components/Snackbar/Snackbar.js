import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';

const defaultFooterStyles = {

};

const SnackbarView = ({
  snackbarState, closeSnack, autoHideDuration, classes,
}) => (
  <Snackbar
    className={classes.snackBar}
    open={snackbarState.open}
    onClose={closeSnack}
    autoHideDuration={autoHideDuration}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    message={(
      <div className={classes.snackBarMessage}>
        <span className={classes.snackBarMessageIcon}>
          <SuccessOutlinedIcon />
          {' '}
        </span>
        <span className={classes.snackBarText}>

          {snackbarState.value}
          {'    '}
          File(s) successfully
          {' '}
          {snackbarState.action}
          {' '}
          to your files

        </span>
      </div>
)}
  />
);

export default withStyles(defaultFooterStyles, { withTheme: true })(SnackbarView);
