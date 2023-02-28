import React, { useEffect, useReducer } from 'react';
import Actions from './table/Actions';
import TableView from './table/TableController';
import reducer from './table/state/Reducer';
import {
  onRowsPerPageChange,
  onPageChange,
  onRowSeclect,
  setTotalRowCount,
} from './table/state/Actions';

const TabView = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const { tab, dashboardStats, activeFilters } = props;
  const initState = (initailState) => ({
    ...initailState,
    title: tab.name,
    rowsPerPage: 10,
    page: 0,
    dataKey: tab.dataKey,
    sortBy: tab.defaultSortField,
    sortOrder: tab.defaultSortDirection,
    columns: tab.columns,
    totalRowCount: dashboardStats[tab.count],
    selectedRows: [],
  });

  const [table, dispatch] = useReducer(reducer, {}, initState);

  /**
  * update state to props change
  *
  */
  useEffect(() => {
    dispatch(setTotalRowCount(dashboardStats[tab.count]));
  }, [activeFilters, dashboardStats]);

  const handleChangeRowsPerPage = (event) => {
    const noOfRows = parseInt(event.target.value, 10);
    dispatch(onRowsPerPageChange({ rowsPerPage: noOfRows }));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(onPageChange({ pageNumb: newPage }));
  };

  /**
  * update selected Ids
  * @param {*} event
  * @param {*} row
  */
  const onRowSelectHandler = (event, row) => {
    event.stopPropagation();
    let selectedIds = [...table.selectedRows];
    const selectedId = row[tab.dataKey];
    if (!row.isChecked) {
      selectedIds.push(selectedId);
    } else {
      selectedIds = selectedIds.reduce((acc, id) => {
        if (selectedId !== id) {
          acc.push(id);
        }
        return acc;
      }, []);
    }
    dispatch(onRowSeclect(selectedIds));
  };

  return (
    <>
      <Actions
        {...props}
        selectedRows={table.selectedRows}
      />
      <TableView
        {...props}
        table={table}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRowSelectChange={onRowSelectHandler}
      />
    </>
  );
};

export default TabView;
