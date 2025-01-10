import { actionTypes } from "../actions/Action";
import { onFilterValueChange } from "./filter";

const reducer = (state, action) => {
  const { type, payload } = action;
  const cloneState = structuredClone(state);
  switch (type) {
    case actionTypes.UPDATE_DICTIONARY:
      return {
        ...state,
        ...payload
      };
    case actionTypes.ON_TOGGLE_CHECKBOX:
      const updateState = onFilterValueChange(cloneState, payload);
      return updateState;
    case actionTypes.ON_CLEAR_FILTER:
      return state;
    case actionTypes.ON_NODE_FOCUS:
      return state;
    case actionTypes.SHOW_OVERLAY_TABLE:
      const overlayNodeId = payload;
      return {
        ...state,
        overlayNodeId,
      };
    case actionTypes.CLOSE_OVERLAY_TABLE:
      return {
        ...state,
        overlayNodeId: null,
      };
    default:
      return state;
  }
}

export default reducer;
