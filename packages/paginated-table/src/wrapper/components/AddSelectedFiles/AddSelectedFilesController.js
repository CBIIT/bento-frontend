import React, { useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { onAddCartFiles } from '@bento-core/cart';
import { TableContext } from '../../../table/ContextProvider';
import { onRowSeclect } from '../../../table/state/Actions';
import AddSelectedFileComponent from './AddSelectedFilesView';
import { getFilesID } from '../../WrapperService';
import addFilesResponseHandler from '../util';

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
    maxFileLimit = 1000,
  } = props;

  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const {
    selectedRows = [],
    dispatch,
  } = context;
  const variables = {
    first: 10000,
    [dataKey]: selectedRows,
  };
  // add selected files id
  const addSelectedFiles = () => {
    const fileIds = getFilesID({
      client,
      variables,
      fileIds: selectedRows,
      query: addFileQuery,
    });

    fileIds().then((response) => {
      const ids = addFilesResponseHandler(response, responseKeys);
      if (ids.length >= maxFileLimit) {
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
