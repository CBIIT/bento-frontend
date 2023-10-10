import { actionTypes } from './Actions';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ON_COLUMN_SORT:
      return {
        ...state,
        sortOrder: payload.sort,
        sortBy: payload.column,
      };
    case actionTypes.ON_PAGE_CHANGE:
      return {
        ...state,
        page: payload.pageNumb,
      };
    case actionTypes.ON_ROWS_PER_PAGE_CHANGE:
      return {
        ...state,
        rowsPerPage: payload.rowsPerPage,
        page: payload.page,
      };
    case actionTypes.VIEW_COLUMN_CHANGE:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.ON_ROW_SELECT:
      return {
        ...state,
        selectedRows: payload,
      };
    case actionTypes.ON_ROW_EXPAND:
      return {
        ...state,
        expandedRows: payload,
      };
    case actionTypes.ON_PAGE_AND_TOTAL_COUNT_CHANGE:
      return {
        ...state,
        totalRowCount: payload.totalRowCount,
        page: payload.page,
      };
    case actionTypes.SET_TOTAL_ROW_COUNT:
      return {
        ...state,
        totalRowCount: payload,
      };
    default:
      return state;
  }
};

export default reducer;
