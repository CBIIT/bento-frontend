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
import { isEmpty } from 'lodash';
import { cn } from 'bento-components';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDialog-paper': {
    position: 'absolute',
    margin: '0 auto',
    top: 118,
    width: '539px',
    borderRadius: '8px',
    boxShadow: '0 0 29px 16px rgba(0,0,0,0.36)',
  },
  '& .MuiDialogTitle-root': {
    flex: '0 0 auto',
    margin: 0,
    padding: '12px 23px 6px 37px',
    marginBottom: '45px',
    fontFamily: 'Lato',
  },
  '& .MuiDialogContent-root': {
    flex: '1 1 auto',
    padding: '0px 40px',
    marginBottom: ({ requiredMB }) => requiredMB || '45px',
    overflowY: 'auto',
  },
  '& .MuiDialogContentText-root': {
    fontFamily: 'Nunito',
    fontSize: '17px',
    color: '#000000;',
    textAlign: 'center',
    marginBottom: '17px',
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: '24px',
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
    classes, handleOpen, handleClose, handleConfrim,
    accessObj, comment, handleCommentChange, commentField,
  } = props;

  const { dialogTitle, placeholder } = accessObj;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={handleOpen}
        aria-labelledby="Review Data Access Request(s) dialog"
        requiredMB={commentField === 'Required' ? '25px' : ''}
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
            { commentField === 'Required' ? <sup className={classes.requiredAsterisk}>*</sup> : null }
          </DialogContentText>
          <textarea
            onChange={handleCommentChange}
            value={comment}
            className={classes.textArea}
            placeholder={placeholder}
            label="Comment"
          />
          {commentField === 'Required'
            ? (
              <div className={classes.requiredLabel}>
                * Comment is required.
              </div>
            )
            : null}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            variant="contained"
            onClick={handleClose}
            className={cn(classes.actionBtn, classes.cancelButton)}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={handleConfrim}
            className={cn(classes.actionBtn, classes.confrimButton)}
            {...commentField === 'Required' && isEmpty(comment && comment.trim()) ? { disabled: true } : {}}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
const styles = () => ({
  dialogTitleContainer: {
    borderBottom: '1.5px solid #BDBFC2',
  },
  requiredLabel: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '400',
    color: '#BC3900',
    lineHeight: '22px',
    marginTop: '5px',
    textAlign: 'center',
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
    fontSize: '14px',
    fontFamily: 'Lato',
    resize: 'none',
    color: '#555555',
    lineHeight: '21px',
    marginBottom: ({ requiredTextMT }) => requiredTextMT || '0px',
  },
  actionBtn: {
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: '11px',
    lineHeight: '22px',
    textAlign: 'center',
    borderRadius: '8px',
    border: '1px solid #626262',
    height: '38px',
    width: '97px',
  },
  cancelButton: {
    backgroundColor: '#566672',
  },
  confrimButton: {
    backgroundColor: '#437BBE',
    marginLeft: '13px !important',
  },
  requiredAsterisk: {
    fontFamily: 'Lato',
    fontSize: '15px',
    color: '#BC3900',
  },
});

export default withStyles(styles, { withTheme: true })(CustomizedDialogs);
