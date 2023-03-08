import React, { useEffect } from 'react';
import TableView from './TableController';
import {
  onRowsPerPageChange,
  onPageChange,
  onRowSeclect,
  setTotalRowCount,
  onColumnSort,
} from './state/Actions';
import { themeConfig } from './TableThemeConfig';

const PaginatedTable = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    tab,
    dashboardStats,
    activeFilters,
    dispatch,
    table,
  } = props;

  /**
  * update state to props change
  *
  */
  useEffect(() => {
    dispatch(setTotalRowCount(dashboardStats[tab.count]));
  }, [activeFilters, dashboardStats]);

  const handleChangeRowsPerPage = (event) => {
    const noOfRows = parseInt(event.target.value, 10);
    const { totalRowCount, page } = table;
    let newPage = page;
    // row per page is greater than total row count
    // set page to last page number
    if (page * noOfRows > totalRowCount) {
      newPage = Math.floor(totalRowCount / noOfRows);
    }
    dispatch(onRowsPerPageChange({ rowsPerPage: noOfRows, page: newPage }));
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

  const handleToggleSelectAll = (event, Ids, includeIds) => {
    if (event.target.checked && !includeIds) {
      const selecedIds = Ids.concat(table.selectedRows);
      dispatch(onRowSeclect(selecedIds));
    } else {
      const filterIds = table.selectedRows.filter((id) => !Ids.includes(id));
      dispatch(onRowSeclect(filterIds));
    }
  };

  const handleSortByColumn = (column, order) => {
    const sort = order === 'asc' ? 'desc' : 'asc';
    dispatch(onColumnSort({ sort, column }));
  };

  return (
    <>
      <TableView
        {...props}
        table={table}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRowSelectChange={onRowSelectHandler}
        onToggleSelectAll={handleToggleSelectAll}
        onSortByColumn={handleSortByColumn}
        themeConfig={themeConfig}
      />
    </>
  );
};

export default PaginatedTable;
