import { actionTypes } from './Actions';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ON_COLUMN_SORT:
      return state;
    case actionTypes.ON_SORT_ORDER_CHANGE:
      return {
        ...state,
        sortOrder: payload.sortOrder,
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
      };
    case actionTypes.VIEW_COLUMN_CHANGE:
      return state;
    default:
      return state;
  }
};

export default reducer;
