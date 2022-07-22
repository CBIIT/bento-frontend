import * as React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  p: {
    padding: theme.spacing(2),
  },
}));

export const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} style={{ display: 'flex' }}>
      {children}
      <div style={{ border: '1px solid red' }}>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
            style={{ border: '1px solid black' }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </DialogTitle>
  );
};

export default function CustomizedDialogs(props) {
  const {
    handleOpen, handleClose, handleConfrim, accessObj,
  } = props;
  const {
    dialogTitle, placeholder,
  } = accessObj;
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="approve-access-dialog"
        open={handleOpen}
      >
        <BootstrapDialogTitle id="approve-access-dialog" onClose={handleClose}>
          {dialogTitle}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Typography align="center">
                Enter a comment that will be sent to the user.
              </Typography>
              <br />
              <TextareaAutosize
                aria-label="Message"
                minRows={5}
                placeholder={placeholder}
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CANCEL
          </Button>
          <Button autoFocus onClick={handleConfrim}>
            CONFIRM
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
