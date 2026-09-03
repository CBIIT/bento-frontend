import React from 'react';
import { Snackbar } from '@material-ui/core';
import { formatCartAddMessage } from '@bento-core/cart';
import SuccessOutlinedIcon from './SuccessOutlined';

/**
 * Legacy MUI snackbar kept for non-CPI table cart actions.
 * Explore CPI uses CartToast instead.
 */
const SnackbarView = (props) => {
  const {
    count,
    alreadyInCartCount = 0,
    open,
    onClose,
  } = props;

  if (open) {
    setTimeout(() => {
      onClose();
    }, 3000);
  }

  return (
    <>
      <Snackbar
        className="snackBar"
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        style={{ bottom: '-45%', zIndex: 15000, pointerEvents: 'none' }}
        message={(
          <div className="snackBarMessage">
            <span className="snackBarMessageIcon">
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className="snackBarText">
              {formatCartAddMessage(count, alreadyInCartCount)}
            </span>
          </div>
        )}
      />
    </>
  );
};

export default SnackbarView;
