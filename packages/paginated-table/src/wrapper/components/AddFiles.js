import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import AddAllFilesView from './AddAllFiles/AddAllView';
import AddSelectedFilesView from './AddSelectedFiles/AddSelectedFilesController';
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
    btnType,
    count,
    alertMessage,
    cartFiles,
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
      {
        (btnTypes.ADD_SELECTED_FILES === btnType) && (
          <AddSelectedFilesView
            {...props}
            client={client}
            setAlterDisplay={setAlterDisplay}
            setOpenSnackbar={setOpenSnackbar}
          />
        )
      }
      {
        (btnTypes.ADD_ALL_FILES === btnType) && (
          <AddAllFilesView
            {...props}
            client={client}
            setAlterDisplay={setAlterDisplay}
            setOpenSnackbar={setOpenSnackbar}
            cartFiles={cartFiles}
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

export default AddFilesView;
