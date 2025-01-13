import { actionTypes } from "../actions/Action";
import { getInitState, onFilterValueChange } from "./filter";
  
const reducer = (state, action) => {
  const { type, payload } = action;
  let updateState = structuredClone(state);
  switch (type) {
    case actionTypes.UPDATE_DICTIONARY:
      return {
        ...state,
        ...payload
      };
    case actionTypes.ON_TOGGLE_CHECKBOX:
      updateState = onFilterValueChange(updateState, payload);
      return updateState;
    case actionTypes.ON_CLEAR_FILTER:
      console.log('ON CLEAR FILTERs');
      updateState = getInitState(state);
      return {
        ...state,
        ...updateState
      };
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
