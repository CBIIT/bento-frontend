import React from 'react';
import { Snackbar } from '@material-ui/core';
import SuccessOutlinedIcon from './SuccessOutlined';

const SnackbarView = (props) => {
  const {
    count,
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
        message={(
          <div className="snackBarMessage">
            <span className="snackBarMessageIcon">
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className="snackBarText">
              {count}
              {' '}
              File(s) successfully added to your cart
            </span>
          </div>
        )}
      />
    </>
  );
};

export default SnackbarView;
