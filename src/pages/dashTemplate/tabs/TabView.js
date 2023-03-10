import React, { useReducer } from 'react';
import { withStyles } from '@material-ui/core';
import TableView from '../../../bento-core/PaginationTable/PaginatedTable';
import reducer from '../../../bento-core/PaginationTable/state/Reducer';
import styles from './TabStyle';
import { tableViewConfig } from '../../../bento/dashboardTabData';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';
import Wrapper from './wrapperConfig/Wrapper';

const TabView = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    config,
    dashboardStats,
    activeFilters,
  } = props;
  /*
  * useReducer table state
  * paginated table update data when state change
  */
  const initState = (initailState) => ({
    ...initailState,
    title: config.name,
    query: config.api,
    rowsPerPage: 10,
    page: 0,
    dataKey: config.dataKey,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    columns: configColumn(config.columns),
    totalRowCount: dashboardStats[config.count],
    selectedRows: [],
    tableMsg: config.tableMsg,
  });

  const [table, dispatch] = useReducer(reducer, {}, initState);

  return (
    <>
      <Wrapper
        parent={config.name}
        selectedRows={table.selectedRows}
      >
        <TableView
          {...props}
          viewConfig={tableViewConfig}
          table={table}
          dispatch={dispatch}
          themeConfig={themeConfig}
          activeFilters={activeFilters}
        />
      </Wrapper>
    </>
  );
};

export default withStyles(styles)(TabView);
