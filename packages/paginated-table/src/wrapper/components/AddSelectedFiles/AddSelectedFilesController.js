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
    applyActiveFilter = false,
    activeFilters = {},
    currentCartFileIds = [],
  } = props;

  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const {
    selectedRows = [],
    dispatch,
  } = context;

  const activeFilterItems = applyActiveFilter ? {
    ...activeFilters,
  } : {};

  const variables = {
    first: 10000,
    ...activeFilterItems,
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
      // Filter out files already in cart to avoid double-counting
      const newUniqueFiles = ids.filter((id) => !currentCartFileIds.includes(id));
      // Check if TOTAL (current cart + NEW unique files) exceeds limit
      const totalFilesCount = currentCartFileIds.length + newUniqueFiles.length;
      if (totalFilesCount > maxFileLimit) {
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
