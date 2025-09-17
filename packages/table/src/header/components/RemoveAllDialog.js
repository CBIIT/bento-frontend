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
    customModalMessage,
    cancelText = 'No',
    okText = 'Yes',
  } = props;
  const deleteAllFiles = () => {
    removeAllFiles();
    toggleDisplay();
  };

  const generateModalMessage = (countValue) => {
    if (customModalMessage) {
      return customModalMessage(countValue);
    }
    return (
      <>
        Remove
        {' '}
        <b>
          All files
          {' ('}
          {countValue}
          {') '}
        </b>
        From Cart
      </>
    );
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
            {generateModalMessage(count)}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="actionsWrapper">
          <Button className="okBtn" onClick={deleteAllFiles}>
            {okText}
          </Button>
          <Button className="cancelBtn" onClick={() => toggleDisplay()}>
            {cancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RemoveAllDialogView;
