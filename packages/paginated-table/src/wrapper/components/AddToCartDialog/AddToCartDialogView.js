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
    activeFilters,
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

  const CustomDialog = DisplayCustomText && DisplayCustomText.component;

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
              <CustomDialog
                onYesClick={onYesClick}
                onNoClick={onNoClick}
                activeFilters={activeFilters}
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
          { DisplayCustomText && DisplayCustomText.actions && DisplayCustomText.actions.map((a) => (
            <Button
              className={a.className}
              onClick={() => {
                if (a.type === 'Positive') {
                  onYesClick();
                } else {
                  onNoClick();
                }
              }}
            >

              {a.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddToCartDialogView;
