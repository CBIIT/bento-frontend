import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button,
} from '@material-ui/core';
import Alert from './AddToCartDialogAlertView';

function AddToCartDialogView(props) {
  const {
    open,
    numberOfFilesSelected,
    onYesClick,
    onNoClick,
    cartWillFull = false,
    alertMessage,
    DisplayCustomText,
  } = props;

  if (cartWillFull) {
    return (
      <Alert
        alertMessage={alertMessage}
        open={open}
        onClose={() => onNoClick()}
      />
    );
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {
            DisplayCustomText ? (
              <DisplayCustomText
                onYesClick={onYesClick}
                onNoClick={onNoClick}
              />
            ) : (
              <DialogContentText id="alert-dialog-description">
                Are you sure to add All Files
                {' '}
                {numberOfFilesSelected}
                {' '}
                to cart
              </DialogContentText>
            )
          }
        </DialogContent>
        <DialogActions className="dialog_actions">
          <Button className="yesBtn" onClick={() => onYesClick()}>
            Yes
          </Button>
          <Button className="noBtn" onClick={() => onNoClick()}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddToCartDialogView;
