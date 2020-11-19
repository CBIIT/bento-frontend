import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button,
} from '@material-ui/core';
import DialogThemeProvider from './dialogThemeConfig';
import { addToCart } from '../../fileCentricCart/store/cart';
import { fetchAllFileIDsForSelectAll, getFilesCount } from '../store/dashboardReducer';

const useStyles = makeStyles({
  popUpWindowText: {
    fontFamily: 'Lato',
    size: '16px',
  },
  okButton: {
    background: '#98A19E',
    color: '#fff',
    cursor: 'pointer',
  },
  cancelButton: {
    background: '#42779A',
    color: '#fff',
    cursor: 'pointer',
  },
  button: {
    borderRadius: '10px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#142D64',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '24px',
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  async function exportFiles() {
    // Find the newly added files by comparing
    const getAllFilesData = await fetchAllFileIDsForSelectAll(getFilesCount());
    const selectedIDs = getAllFilesData.reduce((accumulator, currentValue) => {
      const { files } = currentValue;
      // check if file
      if (files && files.length > 0) {
        return accumulator.concat(files.map((f) => f.file_id));
      }
      return accumulator;
    }, []);
    addToCart({ fileIds: selectedIDs });
    onClose();
  }

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
            {getFilesCount()}
            {' '}
            to cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => exportFiles()} className={classes.okButton}>
            Yes
          </Button>
          <Button onClick={() => handleClose()} className={classes.cancelButton}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </DialogThemeProvider>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleClickOpen} className={classes.button}>
        Select All
      </button>
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  );
}
