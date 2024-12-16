import React, { useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { onAddCartFiles } from '@bento-core/cart';
import { TableContext } from '../../../table/ContextProvider';
import { onRowSeclect } from '../../../table/state/Actions';
import AddSelectedFileComponent from './AddSelectedFilesView';
import { getFilesID } from '../../WrapperService';

const checkDuplicate = (cartFiles, ids) => {
  let duplicateCount = 0;
  for (let i = 0; i < cartFiles.length; i += 1) {
    if (ids.includes(cartFiles[i])) {
      duplicateCount += 1;
    }
  }
  return duplicateCount;
};

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
    cartFiles,
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
    const cartCount = cartFiles.length;
    fileIds().then((response) => {
      const idsInitial = response[responseKeys[0]] || [];
      const ids = [...new Set(idsInitial)];
      const fileCount = ids.length;
      const upperLimit = 200000;
      if (fileCount <= upperLimit && cartCount < upperLimit) {
        if (cartCount + fileCount <= upperLimit) {
          addFiles(ids);
          setOpenSnackbar(true);
          dispatch(onRowSeclect([]));
        } else {
          const duplicate = checkDuplicate(cartFiles, ids);
          if (cartCount + fileCount - duplicate <= upperLimit) {
            addFiles(ids);
            setOpenSnackbar(true);
            dispatch(onRowSeclect([]));
          } else {
            setAlterDisplay(true);
          }
        }
      } else {
        setAlterDisplay(true);
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
