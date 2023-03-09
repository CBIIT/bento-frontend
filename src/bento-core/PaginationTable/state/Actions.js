export const actionTypes = {
  VIEW_COLUMN_CHANGE: 'VIEW_COLUMN_CHANGE',
  ON_COLUMN_SORT: 'ON_COLUMN_SORT',
  ON_SORT_ORDER_CHANGE: 'ON_SORT_ORDER_CHANGE',
  ON_ROWS_PER_PAGE_CHANGE: 'ON_ROWS_PER_PAGE_CHANGE',
  ON_PAGE_CHANGE: 'ON_PAGE_CHANGE',
  ON_ROW_SELECT: 'ON_ROW_SELECT',
  SET_TOTAL_ROW_COUNT: 'SET_TOTAL_ROW_COUNT',
  ON_PAGE_AND_TOTAL_COUNT_CHANGE: 'ON_PAGE_AND_TOTAL_COUNT_CHANGE',
};

export const onClumnViewChange = (columns) => ({
  type: actionTypes.VIEW_COLUMN_CHANGE,
  payload: columns,
});

export const onColumnSort = (value) => ({
  type: actionTypes.ON_COLUMN_SORT,
  payload: value,
});

export const onChangeSortDirection = (sortOrder) => ({
  type: actionTypes.ON_COLUMN_SORT,
  payload: sortOrder,
});

export const onRowsPerPageChange = (value) => ({
  type: actionTypes.ON_ROWS_PER_PAGE_CHANGE,
  payload: value,
});

export const onPageAndTotalCountChange = (value) => ({
  type: actionTypes.ON_PAGE_AND_TOTAL_COUNT_CHANGE,
  payload: value,
});

export const onPageChange = (pageNumb) => ({
  type: actionTypes.ON_PAGE_CHANGE,
  payload: pageNumb,
});

export const onRowSeclect = (rows) => ({
  type: actionTypes.ON_ROW_SELECT,
  payload: rows,
});

export const setTotalRowCount = (count) => ({
  type: actionTypes.SET_TOTAL_ROW_COUNT,
  payload: count,
});
