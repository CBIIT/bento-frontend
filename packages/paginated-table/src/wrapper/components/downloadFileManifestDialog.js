import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  IconButton,
  DialogContent, DialogContentText, withStyles,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  dialogContainer: {
    borderRadius: '0px !important',
    textAlign: 'center',
    width: '700px !important',
    height: 'auto !important',
    backgroundColor: 'white !important',
    border: '2px solid white',
  },
  contentText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'justify',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '14px',
    color: '#000',
  },
  textArea: {
    width: '100%',
    height: '100%',
    border: '3px solid #B2C0C6',
    borderRadius: '12px',
    backgroundColor: '#ECF3F7',
    '& .MuiInputBase-input': {
      // height: '215px !important',
      border: '0px !important',
    },
  },
  downloadFileManifestBtn: {
    width: 'fit-content',
    marginTop: '23px',
  },
  dialogHeaderSection: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '46px',
  },
  closeBtn: {
    color: '#0d71a3',
  },
  dialogTitle: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    width: '100%',
    fontSize: '18px',
    color: '#7896A9',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const CustomDialogContent = withStyles(() => ({
  root: {
    backgroundColor: '#fff',
    margin: '10px',
    overflowY: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))((props) => (
  <DialogContent {...props} />
));

const DownloadFileManifestDialog = React.forwardRef(({
  onClose, open, downloadSCSVFile,
}, ref) => {
  const [comment, setComment] = useState('');
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  React.useImperativeHandle(ref, () => ({
    getValue() {
      return comment;
    },
  }));

  const handleTextFieldChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.dialogContainer }}>
      <div className={classes.dialogHeaderSection}>
        <DialogTitle id="simple-dialog-title" classes={{ root: classes.dialogTitle }}>
          Optional User Comments
        </DialogTitle>
        <IconButton
          className={classes.closBtnContainer}
          onClick={onClose}
        >
          <CloseIcon
            fontSize="small"
            className={classes.closeBtn}
          />
        </IconButton>
      </div>

      <CustomDialogContent>
        <DialogContentText classes={{ root: classes.contentText }}>
          {/* eslint-disable-next-line max-len */}
          If you wish to annotate the file manifest with comments regarding the files included, enter them here. Comments will be saved as part of the file manifest.
        </DialogContentText>
        <TextField
          multiline
          value={comment}
          onChange={handleTextFieldChange}
          variant="outlined"
          minRows={4}
          classes={{ root: classes.textArea, input: classes.input }}
        />
        <Button
          onClick={() => { downloadSCSVFile(comment); }}
          classes={{ root: classes.downloadFileManifestBtn }}
        >
          Continue to Download File Manifest
        </Button>
      </CustomDialogContent>
    </Dialog>
  );
});

export default DownloadFileManifestDialog;
