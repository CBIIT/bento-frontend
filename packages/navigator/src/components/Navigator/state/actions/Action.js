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
