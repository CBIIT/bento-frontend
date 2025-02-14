import React, {
  useContext,
  useEffect,
  useReducer,
} from 'react';
import ServerTableView from './ServerController';
import ClientTableView from './ClientController';
import {
  onRowsPerPageChange,
  onPageChange,
  onRowSeclect,
  setTotalRowCount,
  onColumnSort,
  onPageAndTotalCountChange,
  onColumnViewChange,
  onRowDelete,
  onClearCart,
  onInputSearchQueryChange,
} from './state/Actions';
import { TableContext } from './ContextProvider';
import reducer from './state/Reducer';

const PaginatedTable = ({
  queryVariables = {},
  themeConfig = {},
  totalRowCount = 0,
  initState,
  activeTab = true,
  server = true,
  tblRows = [],
  paginationOptions = {},
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
    const { setContext } = tableContext;
    setContext({ ...table, dispatch });
  }, [table]);

  /**
  * update state to props change
  */
  useEffect(() => {
    const { page, rowsPerPage } = table;
    // validate table state - curr rowCount should be less than total row count after filter
    // above validation steps when page is zero
    // prevent currentRows denominator to be zero (newPage -> Nan)
    if (page > 0 && totalRowCount <= page * rowsPerPage) {
      const adjustRow = (page === 1) ? 1 : 0;
      const currentRows = (page * rowsPerPage) + adjustRow;
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
    dispatch(onRowsPerPageChange({ rowsPerPage: noOfRows, page: 0 }));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(onPageChange({ pageNumb: newPage }));
  };
  // custonize pagination behavior
  const {
    customizeOnRowSelect,
    customizeToggleSelectAll,
    customizeSortByColumn,
    customizeChangePage,
    customizeChangeRowsPerPage,
    customizeColumnViewChange,
    customizeDeleteRow,
    customizeDeleteAllRows,
    customizeSearchQueryChange,
  } = paginationOptions;

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
    const { sortBy } = table;
    const sort = (order === 'asc' && sortBy === column) ? 'desc' : 'asc';
    dispatch(onColumnSort({ sort, column }));
  };

  /**
  * manage columns view change
  * hide/display columns from table
  */
  const handleColumnViewChange = (column) => {
    const columns = table.columns.map((col) => {
      const updateColumnView = { ...col };
      if (col.dataField && col.dataField === column.dataField) {
        updateColumnView.display = !column.display;
      }
      return updateColumnView;
    });
    dispatch(onColumnViewChange({
      ...table,
      columns,
    }));
  };

  /**
  * handle delete row from table
  * remove selected rows
  */
  const onDeleteRow = (row) => {
    let selectedIds = table.selectedRows;
    // if del row is selected remove from selected rows
    if (row.isChecked) {
      const delId = row[table.dataKey];
      selectedIds = table.selectedRows.reduce((acc, id) => {
        if (delId !== id) {
          acc.push(id);
        }
        return acc;
      }, []);
    }
    dispatch(onRowDelete({
      deletedRow: row,
      selectedRows: selectedIds,
    }));
  };

  /**
  * clear selected rows when all files are removed from myCart/ My file
  */
  const onDeleteAllRows = () => {
    dispatch(onClearCart({
      deletedRows: table.selectedRows,
      selectedRows: [],
    }));
  };

  /**
  * Filter table rows based on Search query
  */
  const handleSeachQueryChange = (value) => {
    dispatch(onInputSearchQueryChange({
      searchQuery: value,
    }));
  };

  /**
  * A. client table
  * table data provide by bento app (tblRows)
  * Rows display & column sorting by ClientController
  */
  if (!server) {
    return (
      <>
        <ClientTableView
          tblRows={tblRows}
          table={table}
          onRowsPerPageChange={customizeChangeRowsPerPage || handleChangeRowsPerPage}
          onPageChange={customizeChangePage || handleChangePage}
          onRowSelectChange={customizeOnRowSelect || onRowSelectHandler}
          onToggleSelectAll={customizeToggleSelectAll || handleToggleSelectAll}
          onSortByColumn={customizeSortByColumn || handleSortByColumn}
          onColumnViewChange={customizeColumnViewChange || handleColumnViewChange}
          onDeleteRow={customizeDeleteRow || onDeleteRow}
          onDeleteAllFiles={customizeDeleteAllRows || onDeleteAllRows}
          onSearchQueryChange={customizeSearchQueryChange || handleSeachQueryChange}
          themeConfig={themeConfig}
        />
      </>
    );
  }

  /**
  * B. server table
  * bento-core makes http call base on table state
  */
  /**
  * prevent loading data except for active tab
  */
  if (!activeTab) {
    return null;
  }

  return (
    <>
      <ServerTableView
        queryVariables={queryVariables}
        totalRowCount={totalRowCount}
        table={table}
        server={server}
        onRowsPerPageChange={customizeChangeRowsPerPage || handleChangeRowsPerPage}
        onPageChange={customizeChangePage || handleChangePage}
        onRowSelectChange={customizeOnRowSelect || onRowSelectHandler}
        onToggleSelectAll={customizeToggleSelectAll || handleToggleSelectAll}
        onSortByColumn={customizeSortByColumn || handleSortByColumn}
        onColumnViewChange={customizeColumnViewChange || handleColumnViewChange}
        onDeleteRow={customizeDeleteRow || onDeleteRow}
        onDeleteAllFiles={customizeDeleteAllRows || onDeleteAllRows}
        onSearchQueryChange={customizeSearchQueryChange || handleSeachQueryChange}
        themeConfig={themeConfig}
      />
    </>
  );
};

export default PaginatedTable;
