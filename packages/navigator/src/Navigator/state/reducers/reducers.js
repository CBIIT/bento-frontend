/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
import { actionTypes } from '../actions/Action';
import {
  clearActiveFacetSection,
  getInitState,
  onToggleFacetFilter,
} from './filter';

const reducer = (state, action) => {
  const { type, payload } = action;
  let updateState = structuredClone(state);
  switch (type) {
    case actionTypes.UPDATE_DICTIONARY:
      return {
        ...state,
        ...payload,
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
      const { matches, summary } = payload;
      return {
        ...updateState,
        isSearchMode: true,
        matches,
        summary,
        focusedNodeId: null,
      };
    case actionTypes.ON_SEARCH_TEXT_CLEAR:
      return {
        ...updateState,
        isSearchMode: false,
        matches: null,
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
