import React, { useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { TableContext } from '../../../PaginationTable/ContextProvider';
import AddSelectedFileComponent from './AddSelectedFilesView';
import { getFilesID } from '../../WrapperService';
import { onAddCartFiles } from '../../../Cart/store/actions';
import { onRowSeclect } from '../../../PaginationTable/state/Actions';

const AddSelectedFilesController = (props) => {
  const {
    clsName,
    section,
    addFileQuery,
    responseKeys,
    dataKey,
    addFiles,
    setOpenSnackbar,
    setAlterDisplay,
  } = props;

  const tableContext = useContext(TableContext);
  const {
    selectedRows = [],
    dispatch,
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
      if (ids.length >= 1000) {
        setAlterDisplay(true);
      } else {
        addFiles(ids);
        setOpenSnackbar(true);
        dispatch(onRowSeclect([]));
      }
    });
  };

  return (
    <>
      <AddSelectedFileComponent
        {...props}
        eventHandler={addSelectedFiles}
        clsName={clsx(clsName, `${clsName}_${section}`)}
        disabled={selectedRows.length === 0}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(null, mapDispatchToProps)(AddSelectedFilesController);
