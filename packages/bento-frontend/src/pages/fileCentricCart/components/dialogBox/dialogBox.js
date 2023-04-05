import React from 'react';
import {
  withStyles, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Styles from './dialogBox.style';
import DialogThemeProvider from './dialogThemeConfig';

const DialogBox = ({
  classes,
  isOpen,
  acceptAction,
  closeModal,
  messageData,
  numberOfFilesBeDeleted,
}) => (
  <DialogThemeProvider>
    <Dialog
      open={isOpen}
      onClose={() => closeModal()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.popUpWindow}
    >
      <DialogContent className={classes.popUpWindowContent}>
        <DialogContentText id="alert-dialog-description">
          { messageData.messagePart1 }
          <b>
            { messageData.messagePart2 }
            { numberOfFilesBeDeleted }
            { messageData.messagePart3 }
          </b>
          { messageData.messagePart4 }
          {' '}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disableElevation onClick={() => acceptAction()} className={classes.okButton}>
          {messageData.okButtonText}
        </Button>
        <Button variant="contained" disableElevation onClick={() => closeModal()} className={classes.cancelButton}>
          {messageData.cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  </DialogThemeProvider>
);

export default withStyles(Styles, { withTheme: true })(DialogBox);
