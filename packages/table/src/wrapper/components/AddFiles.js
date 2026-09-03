import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import CPIFilesView from './CPIFilesView/CPIFilesView';
import CartToast from './Snackbar/CartToast';
import AlertView from './AddToCartDialog/AddToCartDialogAlertView';

export const btnTypes = {
  ADD_ALL_FILES: 'ADD_ALL_FILES',
  ADD_SELECTED_FILES: 'ADD_SELECTED_FILES',
  DOWNLOAD_MANIFEST: 'DOWNLOAD_MANIFEST',
};
/**
* Explore CPI add-files button. Uses CartToast (body portal) instead of the
* Global Search MUI Snackbar so the toast stays visible above the Explore Modal.
*/
const AddFilesView = (props) => {
  const {
    count,
    alreadyInCartCount,
    alertMessage,
    cartFiles,
    buttonStyle,
  } = props;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [displayAlter, setAlterDisplay] = useState(false);
  const client = useApolloClient();

  return (
    <>
      <CPIFilesView
        {...props}
        client={client}
        setAlterDisplay={setAlterDisplay}
        setOpenSnackbar={setOpenSnackbar}
        cartFiles={cartFiles}
        buttonStyle={buttonStyle}
      />
      <CartToast
        open={openSnackbar}
        count={count}
        alreadyInCartCount={alreadyInCartCount}
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

export default AddFilesView;
