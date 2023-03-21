import React from 'react';
import TableView from '../../bento-core/PaginationTable/PaginatedTable';
// import { configColumn } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';

const CartView = ({
  // classes,
  config,
}) => {
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: config.columns,
    count: 11,
    selectedRows: [],
    tableMsg: config.tableMsg,
    paginationAPIField: config.paginationAPIField,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    rowsPerPage: 10,
    page: 0,
  });

  const myFileIds = JSON.parse(localStorage.getItem('CartFileIds')) || [];
  const variables = {};
  variables.file_ids = myFileIds;
  return (
    <>
      <TableView
        initState={initTblState}
        themeConfig={themeConfig}
        queryVariables={variables}
        totalRowCount={myFileIds.length}
      />
    </>
  );
};

export default CartView;
