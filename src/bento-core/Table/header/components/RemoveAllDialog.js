import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@material-ui/core';

function RemoveAllDialogView(props) {
  const {
    open,
    toggleDisplay,
    numberOfFilesSelected = 0,
    removeAllFiles,
  } = props;
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove
            {' '}
            <b>
              All files
              {' ('}
              {numberOfFilesSelected}
              {') '}
            </b>
            From Cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="okBtn" onClick={removeAllFiles}>
            Ok
          </Button>
          <Button className="cancelBtn" onClick={() => toggleDisplay()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RemoveAllDialogView;
