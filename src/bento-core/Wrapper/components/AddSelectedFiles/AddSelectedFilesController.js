import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { TableContext } from '../../../PaginationTable/ContextProvider';
import AddSelectedFileComponent from './AddSelectedFilesView';
import AlertView from '../AddToCartDialog/AddToCartDialogAlertView';
import { getFilesID } from '../../WrapperService';
import { onAddCartFiles } from '../../../Cart/store/actions';

const AddSelectedFilesController = (props) => {
  const {
    clsName,
    section,
    addFileQuery,
    responseKeys,
    dataKey,
    alertMessage,
    addFiles,
    setOpenSnackbar,
  } = props;

  const tableContext = useContext(TableContext);
  const {
    selectedRows = [],
  } = tableContext.tblState;
  const variables = {};
  variables[dataKey] = selectedRows;
  // add selected files id
  const addSelectedFiles = () => {
    const fileIds = getFilesID({
      variables,
      fileIds: selectedRows,
      query: addFileQuery,
    });
    fileIds().then((response) => {
      const ids = response[responseKeys[0]] || [];
      addFiles(ids);
      setOpenSnackbar(true);
      /**
      *
      */
      if (ids.length >= 1000) {
        console.log('exceed 1000 files');
      }
    });
  };

  const [displayAlter, setAlterDisplay] = useState(false);

  return (
    <>
      <AddSelectedFileComponent
        {...props}
        eventHandler={addSelectedFiles}
        clsName={clsx(clsName, `${clsName}_${section}`)}
        disabled={selectedRows.length === 0}
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

const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(null, mapDispatchToProps)(AddSelectedFilesController);
