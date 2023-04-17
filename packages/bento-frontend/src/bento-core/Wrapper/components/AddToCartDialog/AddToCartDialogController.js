import React from 'react';
import Dialog from './AddToCartDialogView';
import Alert from './AddToCartDialogAlertView';

const AddToCartDialogController = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    cartWillFull = false,
    numberOfFilesSelected,
    onYesClick,
    onNoClick,
  } = props;

  if (cartWillFull) {
    return <Alert open={open} onClose={handleClose} />;
  }
  return (
    <Dialog
      open={open}
      numberOfFilesSelected={numberOfFilesSelected}
      onYesClick={onYesClick}
      onNoClick={onNoClick}
    />
  );
};

export default AddToCartDialogController;
