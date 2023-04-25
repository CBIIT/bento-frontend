import React from 'react';
import {
  Dialog, DialogContent, DialogContentText,
} from '@material-ui/core';

function AddToCartDialogAlertView(props) {
  const {
    open,
    onClose,
    alertMessage,
  } = props;
  const closeAlertModelTimer = 4000;

  const AlertDialog = (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="alter-content">
          <DialogContentText id="alert-dialog-description">
            {alertMessage}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );

  if (open) {
    //  close the Dialog after 3 seconds.
    setTimeout(() => { onClose(); }, closeAlertModelTimer);
  }
  return AlertDialog;
}

export default AddToCartDialogAlertView;
