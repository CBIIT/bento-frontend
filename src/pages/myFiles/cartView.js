import React from 'react';
import TableView from '../../bento-core/PaginationTable/PaginatedTable';
import { configColumn } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';

const CartView = ({
  config,
  deleteAllFiles,
  deleteCartFile,
  filesId = [],
}) => {
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: configColumn(config.columns, deleteAllFiles, deleteCartFile),
    selectedRows: [],
    tableMsg: config.tableMsg,
    paginationAPIField: config.paginationAPIField,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    rowsPerPage: 10,
    page: 0,
  });

  // const myFileIds = JSON.parse(localStorage.getItem('CartFileIds')) || [];
  const variables = {};
  variables.file_ids = filesId;
  return (
    <>
      <TableView
        initState={initTblState}
        themeConfig={themeConfig}
        queryVariables={variables}
        totalRowCount={filesId.length}
      />
    </>
  );
};

export default CartView;
