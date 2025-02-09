import { actionTypes } from "../actions/Action";
import {
  clearActiveFacetSection,
  getInitState,
  onToggleFacetFilter,
} from "./filter";
  
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
      updateState = onToggleFacetFilter(updateState, payload);
      return {
        ...updateState,
        focusedNodeId: null,
      };
    case actionTypes.ON_CLEAR_FILTER:
      updateState = getInitState(state);
      return {
        ...state,
        ...updateState,
        focusedNodeId: null,
      };
    case actionTypes.ON_NODE_FOCUS:
      return {
        ...updateState,
        focusedNodeId: payload,
      };
    case actionTypes.ON_CANVAS_CLICK:
      return {
        ...updateState,
        focusedNodeId: null,
      };
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
    case actionTypes.ON_SEARCH_TEXT:
      return {
        ...updateState,
        isSearchMode: true,
        matches: payload
      }
    case actionTypes.ON_SEARCH_TEXT_CLEAR:
      return {
        ...updateState,
        isSearchMode: false,
        matches: null
      };
    case actionTypes.ON_CLEAR_SECTION:
      const { section, facet } = payload;
      updateState = clearActiveFacetSection(section, facet, updateState);
      return {
        ...updateState
      };
    default:
      return state;
  }
}

export default reducer;
