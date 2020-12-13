import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button,
} from '@material-ui/core';
import DialogThemeProvider from './dialogThemeConfig';

function AddToCartDialogView(props) {
  const {
    open,
    numberOfFilesSelected,
    onYesClick,
    onNoClick,
    classes,
  } = props;

  return (
    <DialogThemeProvider>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.popUpWindow}
      >
        <DialogContent className={classes.popUpWindowContent}>
          <DialogContentText id="alert-dialog-description">
            Are you sure to add All Files
            {' '}
            {numberOfFilesSelected}
            {' '}
            to cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onYesClick()} className={classes.okButton}>
            Yes
          </Button>
          <Button onClick={() => onNoClick()} className={classes.cancelButton}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </DialogThemeProvider>
  );
}

export default AddToCartDialogView;
