import React from 'react';
import {
  Dialog, DialogContent, DialogContentText,
} from '@material-ui/core';
import DialogThemeProvider from './dialogThemeConfig';

function AddToCartDialogAlertView(props) {
  const { open, classes, onClose } = props;
  const closeAlertModelTimer = 4000;

  const alertMessage = 'The cart is limited to 1,000 files. Please narrow the search criteria or remove some files from the cart to add more.';

  const AlertDialog = (
    <DialogThemeProvider>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.popUpWindow}
      >
        <DialogContent className={classes.popUpWindowContent}>
          <DialogContentText id="alert-dialog-description">
            {alertMessage}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </DialogThemeProvider>
  );

  if (open === true) {
    //  close the Dialog after 3 seconds.
    setTimeout(() => { onClose(); }, closeAlertModelTimer);
  }
  return AlertDialog;
}

export default AddToCartDialogAlertView;
