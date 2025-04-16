import React, { useContext, useEffect, useReducer } from 'react';
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
  onRowSelectHidden,
  unselectAllRows,
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
}) => {
  /**
  * Initailize useReducer state
  * 1. table: state (Note: table includes cofiguration in addition to pagination state)
  * 2. dispatch: dispatch action (as redux action) to update pagination state
  * 3. Add all btn / Add file button also dispatch action to update table state
  */
  const [table, dispatch] = useReducer(reducer, {}, initState);
  useEffect(() => {
    if (Object.keys(queryVariables).length > 0) {
      dispatch(unselectAllRows());
    }
  }, [queryVariables]);

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

  /**
  * update selected Ids
  * @param {*} event
  * @param {*} row
  */
  const onRowSelectHandler = (event, row) => {
    event.stopPropagation();
    let selectedIds = [...table.selectedRows];
    let hiddenSelectedRows = [...table.hiddenSelectedRows];

    const selectedId = row[table.dataKey];

    let hiddenNewObject = {};

    if (table.hiddenDataKeys && table.hiddenDataKeys.length > 0) {
      table.hiddenDataKeys.forEach((dataK) => {
        hiddenNewObject = {
          ...hiddenNewObject,
          [dataK]: row[dataK],
        };
      });
    }

    if (!row.isChecked) {
      selectedIds.push(selectedId);
      hiddenSelectedRows.push(hiddenNewObject);
    } else {
      selectedIds = selectedIds.reduce((acc, id) => {
        if (selectedId !== id) {
          acc.push(id);
        }
        return acc;
      }, []);

      hiddenSelectedRows = hiddenSelectedRows.reduce((acc, hiddenObject) => {
        if (JSON.stringify(hiddenNewObject) !== JSON.stringify(hiddenObject)) {
          acc.push(hiddenObject);
        }
        return acc;
      }, []);
    }
    dispatch(onRowSeclect(selectedIds));
    dispatch(onRowSelectHidden(hiddenSelectedRows));
  };

  const handleToggleSelectAll = (event, Ids, includeIds, rows) => {
    if (event.target.checked) {
      const filteredRows = [];
      let hiddenNewObject = {};
      rows.forEach((row) => {
        hiddenNewObject = {};
        table.hiddenDataKeys.forEach((dataK) => {
          hiddenNewObject = {
            ...hiddenNewObject,
            [dataK]: row[dataK],
          };
        });
        filteredRows.push(hiddenNewObject);
      });
      const finalHiddenRowData = [...table.hiddenSelectedRows, ...filteredRows];
      dispatch(onRowSelectHidden(finalHiddenRowData));
    } else {
      const filteredHiddenRows = table.hiddenSelectedRows.filter((hiddenRow) => (
        !rows.some((row) => (
          table.hiddenDataKeys.every((dataK) => hiddenRow[dataK] === row[dataK])))));

      dispatch(onRowSelectHidden(filteredHiddenRows));
    }

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
      if (col.dataField === column.dataField) {
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
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handleChangePage}
          onRowSelectChange={onRowSelectHandler}
          onToggleSelectAll={handleToggleSelectAll}
          onSortByColumn={handleSortByColumn}
          onColumnViewChange={handleColumnViewChange}
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
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRowSelectChange={onRowSelectHandler}
        onToggleSelectAll={handleToggleSelectAll}
        onSortByColumn={handleSortByColumn}
        onColumnViewChange={handleColumnViewChange}
        themeConfig={themeConfig}
      />
    </>
  );
};

export default PaginatedTable;
