import React, { useState } from 'react';
import AddAllFilesView from './AddAllFiles/AddAllView';
import AddSelectedFilesView from './AddSelectedFiles/AddSelectedFilesController';
import SnackbarView from './Snackbar/Snackbar';
import AlertView from './AddToCartDialog/AddToCartDialogAlertView';

export const btnTypes = {
  ADD_ALL_FILES: 'ADD_ALL_FILES',
  ADD_SELECTED_FILES: 'ADD_SELECTED_FILES',
};
/**
* customize button based on configuration
* refer config table (wrapper component config)
*/
const AddFilesBtn = (props) => {
  const {
    btnType,
    count,
    alertMessage,
  } = props;
  /**
  * snackbar state
  */
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /**
  * conditionally display max file Alter/Error dialog view
  */
  const [displayAlter, setAlterDisplay] = useState(false);

  return (
    <>
      {
        (btnTypes.ADD_SELECTED_FILES === btnType) && (
          <AddSelectedFilesView
            {...props}
            setAlterDisplay={setAlterDisplay}
            setOpenSnackbar={setOpenSnackbar}
          />
        )
      }
      {
        (btnTypes.ADD_ALL_FILES === btnType) && (
          <AddAllFilesView
            {...props}
            setAlterDisplay={setAlterDisplay}
            setOpenSnackbar={setOpenSnackbar}
          />
        )
      }
      <SnackbarView
        open={openSnackbar}
        count={count}
        onClose={() => setOpenSnackbar(false)}
      />
      {(displayAlter) && (
        <AlertView
          alertMessage={alertMessage}
          open={displayAlter}
          onClose={() => setAlterDisplay(false)}
        />
      )}
    </>
  );
};

export default AddFilesBtn;
