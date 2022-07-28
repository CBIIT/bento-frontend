import React from 'react';
import Button from '@material-ui/core/Button';
import { styled, withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDialog-paper': {
    position: 'absolute',
    margin: '0 auto',
    top: 118,
    width: '539px',
  },
  '& .MuiDialogTitle-root': {
    flex: '0 0 auto',
    margin: 0,
    padding: '15px 23px 8px 37px',
    marginBottom: '45px',
    fontFamily: 'Lato',
  },
  '& .MuiDialogContent-root': {
    flex: '1 1 auto',
    padding: '0px 40px',
    marginBottom: '45px',
    overflowY: 'auto',
  },
  '& .MuiDialogContentText-root': {
    fontFamily: 'Nunito Sans',
    fontSize: '17px',
    color: '#000000;',
    textAlign: 'center',
    marginBottom: '17px',
  },
  '& .MuiDialogActions-root': {
    flex: '0 0 auto',
    display: 'flex',
    alignTtems: 'center',
    justifyContent: 'center',
    padding: '0px',
    marginBottom: '58px',
  },
}));

function CustomizedDialogs(props) {
  const {
    classes, handleOpen, handleClose, handleConfrim, accessObj, comment, handleCommentChange,
  } = props;
  const {
    dialogTitle, placeholder,
  } = accessObj;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={handleOpen}
        aria-labelledby="Review Data Access Request(s) dialog"
      >
        <DialogTitle id={dialogTitle} className={classes.dialogTitleContainer}>
          <div className={classes.dialogTitleBox}>
            <Typography className={classes.dialogTitle}>
              { dialogTitle }
            </Typography>
            <div className={classes.closeIconContainer}>
              <IconButton
                onClick={handleClose}
                aria-label="Close"
                size="small"
              >
                <CloseIcon fontSize="inherit" className={classes.closeIcon} />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a comment that will be sent to the user.
          </DialogContentText>
          <textarea
            onChange={handleCommentChange}
            value={comment}
            className={classes.textArea}
            placeholder={placeholder}
            label="Comment"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" onClick={handleClose} className={classes.cancelButton}>
            CANCEL
          </Button>
          <Button variant="contained" onClick={handleConfrim} className={classes.confrimButton}>
            CONFIRM
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
const styles = () => ({
  dialogTitleContainer: {
    borderBottom: '1.25px solid #BDBFC2',
  },
  dialogTitleBox: {
    display: 'flex',
    alignItems: 'flexStart',
    color: '#4D6787',
  },
  dialogTitle: {
    flexGrow: 1,
    color: '#4D6787',
    fontFamily: 'Lato',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  closeIconContainer: {
    position: 'relative',
    top: '-6px',
    right: '-5px',
  },
  closeIcon: {
    color: '#4D6787',
  },
  textArea: {
    width: '100%',
    height: '129px',
    padding: '12px 20px',
    boxSizing: 'border-box',
    border: '1px solid #7D94A4',
    borderRadius: '10px',
    backgroundColor: '#EAF1FF',
    fontSize: '16px',
    fontFamily: 'Lato',
    resize: 'none',
  },
  cancelButton: {
    color: '#FFFFFF',
    border: '1px solid #626262',
    backgroundColor: '#566672',
  },
  confrimButton: {
    color: '#FFFFFF',
    border: '1px solid #626262',
    backgroundColor: '#437BBE',
    marginLeft: '13px !important',
  },
});

export default withStyles(styles, { withTheme: true })(CustomizedDialogs);
