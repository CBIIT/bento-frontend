import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import CPIFilesView from './CPIFilesView/CPIFilesView';
import SnackbarView from './Snackbar/Snackbar';
import AlertView from './AddToCartDialog/AddToCartDialogAlertView';

export const btnTypes = {
  ADD_ALL_FILES: 'ADD_ALL_FILES',
  ADD_SELECTED_FILES: 'ADD_SELECTED_FILES',
  DOWNLOAD_MANIFEST: 'DOWNLOAD_MANIFEST',
};
/**
* customize button based on configuration
* refer config table (wrapper component config)
*/
const AddFilesView = (props) => {
  const {
    count,
    alertMessage,
    cartFiles,
    buttonStyle,
  } = props;
  /**
  * snackbar state
  */
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /**
  * conditionally display max file Alter/Error dialog view
  */
  const [displayAlter, setAlterDisplay] = useState(false);
  /**
  * acess bento app client via ApolloProvider
  */
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

export default AddFilesView;
