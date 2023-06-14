import React, { useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { onAddCartFiles } from '@bento-core/cart';
import { TableContext } from '../../../table/ContextProvider';
import { onRowSeclect } from '../../../table/state/Actions';
import AddSelectedFileComponent from './AddSelectedFilesView';
import { getFilesID } from '../../WrapperService';

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
    client,
  } = props;

  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const {
    selectedRows = [],
    dispatch,
  } = context;
  const variables = {};
  variables[dataKey] = selectedRows;
  // add selected files id
  const addSelectedFiles = () => {
    const fileIds = getFilesID({
      client,
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
