import React, { useReducer } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './TableStyle';
import reducer from './state/Reducer';
import { onNumberOfRowsPerPageChange, onNextPage } from './state/Actions';

const TableView = ({
  tableRows,
  tab,
}) => {
  const initState = (initailState) => ({
    ...initailState,
    title: tab.name,
    rowPerPage: 10,
    page: 1,
    sortBy: tab.defaultSortField,
    sortOrder: tab.defaultSortDirection,
    columns: tab.columns,
    rows: tableRows,
    selectedRows: [],
  });

  const [table, dispatch] = useReducer(reducer, {}, initState);

  const onNumbOfRowChange = () => {
    dispatch(onNumberOfRowsPerPageChange({ rowPerPage: table.rowPerPage + 5 }));
  };

  const pageNoChangeHandler = () => {
    dispatch(onNextPage({ pageNumb: table.page + 1 }));
  };

  return (
    <>
      <h4>{table.title}</h4>
      <p>
        number of rows/page -
        {table.rowPerPage}
      </p>
      <p>
        sort column
        {table.sortBy}
      </p>
      <p>
        order -
        {table.sortOrder}
      </p>
      <p>
        page -
        {table.page}
      </p>
      <button type="button" onClick={onNumbOfRowChange}>
        No of Rows
      </button>
      <button type="button" onClick={pageNoChangeHandler}>
        Increase page number
      </button>
    </>
  );
};

export default withStyles(styles)(TableView);
