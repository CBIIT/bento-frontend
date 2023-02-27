export const actionTypes = {
  VIEW_COLUMN_CHANGE: 'VIEW_COLUMN_CHANGE',
  ON_COLUMN_SORT: 'ON_COLUMN_SORT',
  ON_SORT_ORDER_CHANGE: 'ON_SORT_ORDER_CHANGE',
  ON_ROWS_PER_PAGE_CHANGE: 'ON_ROWS_PER_PAGE_CHANGE',
  ON_PAGE_CHANGE: 'ON_PAGE_CHANGE',
};

export const onClumnViewChange = (columns) => ({
  type: actionTypes.VIEW_COLUMN_CHANGE,
  payload: columns,
});

export const onColumnSort = (column) => ({
  type: actionTypes.ON_COLUMN_SORT,
  payload: column,
});

export const onChangeSortDirection = (sortOrder) => ({
  type: actionTypes.ON_COLUMN_SORT,
  payload: sortOrder,
});

export const onNumberOfRowsPerPageChange = (rowPerPage) => ({
  type: actionTypes.ON_ROWS_PER_PAGE_CHANGE,
  payload: rowPerPage,
});

export const onNextPage = (pageNumb) => ({
  type: actionTypes.ON_PAGE_CHANGE,
  payload: pageNumb,
});
