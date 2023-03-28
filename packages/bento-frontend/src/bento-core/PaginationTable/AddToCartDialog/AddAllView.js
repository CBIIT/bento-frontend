import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddToCartDialogView from './AddToCartDialogView';

const AddAllFileComponent = ({
  eventHandler,
  title,
  clsName,
  alertMessage,
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={toggleOpen}
        className={clsName}
        disableRipple
      >
        {title}
      </Button>
      <AddToCartDialogView
        open={open}
        onYesClick={eventHandler}
        onNoClick={toggleOpen}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default AddAllFileComponent;
