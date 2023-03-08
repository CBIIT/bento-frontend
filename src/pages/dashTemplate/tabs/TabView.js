import React, { useReducer } from 'react';
import { withStyles } from '@material-ui/core';
import Actions from './Actions';
import TableView from '../../../components/PaginatedTable/PaginatedTable';
import reducer from '../../../components/PaginatedTable/state/Reducer';
import styles from './TabStyle';
import { configColumn } from '../../../components/PaginatedTable/TableUtil';
// import { cellTypes } from '../../../bento-core/Table/Types';
// import { CustomCellView } from '../../../components/PaginatedTable/CustomCell';

const TabView = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    tab,
    dashboardStats,
    activeFilters,
  } = props;
  /*
  * useReducer table state
  * paginated table update data when state change
  */
  console.log(configColumn(tab.columns));
  const initState = (initailState) => ({
    ...initailState,
    title: tab.name,
    query: tab.api,
    rowsPerPage: 10,
    page: 0,
    dataKey: tab.dataKey,
    sortBy: tab.defaultSortField,
    sortOrder: tab.defaultSortDirection,
    columns: configColumn(tab.columns),
    totalRowCount: dashboardStats[tab.count],
    selectedRows: [],
  });

  const [table, dispatch] = useReducer(reducer, {}, initState);

  return (
    <>
      <Actions
        {...props}
        selectedRows={table.selectedRows}
      />
      <TableView
        {...props}
        table={table}
        dispatch={dispatch}
        activeFilters={activeFilters}
      />
    </>
  );
};

export default withStyles(styles)(TabView);
