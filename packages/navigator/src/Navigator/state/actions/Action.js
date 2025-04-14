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
/* eslint-disable arrow-body-style */
export const actionTypes = {
  UPDATE_DICTIONARY: 'UPDATE_DICTIONARY',
  ON_TOGGLE_CHECKBOX: 'ON_TOGGLE_CHECKBOX',
  ON_CLEAR_FILTER: 'ON_CLEAR_FILTER',
  ON_NODE_FOCUS: 'ON_NODE_FOCUS',
  ON_CANVAS_CLICK: 'ON_CANVAS_CLICK',
  SHOW_OVERLAY_TABLE: 'SHOW_OVERLAY_TABLE',
  CLOSE_OVERLAY_TABLE: 'CLOSE_OVERLAY_TABLE',
  ON_PANEL_FOCUS: 'ON_PANEL_FOCUS',
  ON_SEARCH_TEXT: 'ON_SEARCH_TEXT',
  ON_SEARCH_TEXT_CLEAR: 'ON_SEARCH_TEXT_CLEAR',
  ON_CLEAR_SECTION: 'ON_CLEAR_SECTION'
};

export const updateDictionary = (payload) => {
  return {
    type: actionTypes.UPDATE_DICTIONARY,
    payload: payload,
  };
};

/**
 * generate item count and filter dictionary
 */
export const onToggleCheckBox = (payload) => {
  return {
    type: actionTypes.ON_TOGGLE_CHECKBOX,
    payload: payload,
  }
};

/**
 * generate item count and filter dictionary
 */
export const onClearFilter = () => {
  return {
    type: actionTypes.ON_CLEAR_FILTER,
  };
};

/**
 * set the focus node
 */
export const onNodeFocus = (payload) => {
  return {
    type: actionTypes.ON_NODE_FOCUS,
    payload: payload,
  }
};

/**
 * clear the focus node
 */
export const onCanvasClick = () => {
  return {
    type: actionTypes.ON_CANVAS_CLICK,
  }
};


export const showOverlayTable = (payload) => {
  return {
    type: actionTypes.SHOW_OVERLAY_TABLE,
    payload,
  }
}

export const closeOverlayTable = () => {
  return {
    type: actionTypes.CLOSE_OVERLAY_TABLE,
  }
};

export const onTextSearch = (payload) => {
  console.log(payload);
  return {
    type: actionTypes.ON_SEARCH_TEXT,
    payload
  }
};

export const onSearchTextClear = () => {
  return {
    type: actionTypes.ON_SEARCH_TEXT_CLEAR
  }
};

export const onClearSection = (payload) => {
  return {
    type: actionTypes.ON_CLEAR_SECTION,
    payload
  }
}
