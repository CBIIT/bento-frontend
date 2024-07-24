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
    count,
    removeAllFiles,
    onDeleteAllFiles,
  } = props;
  const deleteAllFiles = () => {
    removeAllFiles();
    toggleDisplay();
    onDeleteAllFiles();
  };
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
              {count}
              {') '}
            </b>
            From Cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="okBtn" onClick={deleteAllFiles}>
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
