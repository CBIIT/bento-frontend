import React, { useContext, useEffect, useReducer } from 'react';
import TableView from './TableController';
import {
  onRowsPerPageChange,
  onPageChange,
  onRowSeclect,
  setTotalRowCount,
  onColumnSort,
  onPageAndTotalCountChange,
} from './state/Actions';
import { TableContext } from './ContextProvider';
import reducer from './state/Reducer';

const PaginatedTable = ({
  queryVariables = {},
  viewConfig,
  themeConfig = {},
  totalRowCount = 0,
  initState,
  activeTab = true,
}) => {
  /**
  * Initailize useReducer state
  * 1. table: state (Note: table includes cofiguration in addition to pagination state)
  * 2. dispatch: dispatch action (as redux action) to update pagination state
  * 3. Add all btn / Add file button also dispatch action to update table state
  */
  const [table, dispatch] = useReducer(reducer, {}, initState);

  /**
  * use context to provide table state to wrapper component
  */
  const tableContext = useContext(TableContext);

  useEffect(() => {
    /**
    * set table context
    * 1. provide table state to other component (wrapper comp -> Add file button)
    * 2. provide table dispatch action to other component (wrapper comp)
    */
    tableContext.setTblState({ ...table, dispatch });
  }, [table]);

  /**
  * update state to props change
  */
  useEffect(() => {
    const { page, rowsPerPage } = table;
    // validate table state - curr rowCount should be less than total row count after filter
    if (totalRowCount < page * rowsPerPage) {
      const currentRows = page * rowsPerPage;
      const newPage = Math.floor(totalRowCount / currentRows);
      dispatch(onPageAndTotalCountChange({
        page: newPage,
        totalRowCount,
      }));
    } else {
      dispatch(setTotalRowCount(totalRowCount));
    }
  }, [totalRowCount]);

  const handleChangeRowsPerPage = (event) => {
    const noOfRows = parseInt(event.target.value, 10);
    const { page } = table;
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
    const selectedId = row[table.dataKey];
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
  /**
  * prevent loading data except for active tab
  */
  if (!activeTab) {
    return null;
  }
  return (
    <>
      <TableView
        queryVariables={queryVariables}
        totalRowCount={totalRowCount}
        viewConfig={viewConfig}
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
