import React, { forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from './AddToCartDialogView';
import Alert from './AddToCartDialogAlertView';

const useStyles = makeStyles({
  popUpWindowText: {
    fontFamily: 'Lato',
    size: '16px',
  },
  okButton: {
    background: '#98A19E',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(152,161,158,0.6)',
    },
  },
  cancelButton: {
    background: '#42779A',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(66,119,154,0.6)',
    },
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

// `forwardRef` to gain access to the ref object that is assigned using the `ref` prop.
const AddToCartDialogController = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    },
  }));

  const {
    cartWillFull,
    numberOfFilesSelected,
    onYesClick,
    onNoClick,
  } = props;

  if (cartWillFull) {
    return <Alert open={open} classes={useStyles()} onClose={handleClose} />;
  }
  return (
    <Dialog
      open={open}
      numberOfFilesSelected={numberOfFilesSelected}
      onYesClick={onYesClick}
      onNoClick={onNoClick}
      classes={useStyles()}
    />
  );
});

export default AddToCartDialogController;
