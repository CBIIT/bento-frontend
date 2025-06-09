export const actionTypes = {
  UPDATE_DICTIONARY: 'UPDATE_DICTIONARY',
  ON_TOGGLE_CHECKBOX: 'ON_TOGGLE_CHECKBOX',
  ON_CLEAR_ALL_FILTER: 'ON_CLEAR_ALL_FILTER',
  ON_NODE_FOCUS: 'ON_NODE_FOCUS',
  ON_CANVAS_CLICK: 'ON_CANVAS_CLICK',
  SHOW_OVERLAY_TABLE: 'SHOW_OVERLAY_TABLE',
  CLOSE_OVERLAY_TABLE: 'CLOSE_OVERLAY_TABLE',
  ON_PANEL_FOCUS: 'ON_PANEL_FOCUS',
  ON_SEARCH_TEXT: 'ON_SEARCH_TEXT',
  ON_SEARCH_TEXT_CLEAR: 'ON_SEARCH_TEXT_CLEAR',
  ON_CLEAR_SECTION: 'ON_CLEAR_SECTION',
};

export const updateDictionary = (payload) => ({
  type: actionTypes.UPDATE_DICTIONARY,
  payload,
});

/**
 * generate item count and filter dictionary
 */
export const onToggleCheckBox = (payload) => ({
  type: actionTypes.ON_TOGGLE_CHECKBOX,
  payload,
});

/**
 * generate item count and filter dictionary
 */
export const onClearAllFilter = () => ({
  type: actionTypes.ON_CLEAR_ALL_FILTER,
});

/**
 * set the focus node
 */
export const onNodeFocus = (payload) => ({
  type: actionTypes.ON_NODE_FOCUS,
  payload,
});

/**
 * clear the focus node
 */
export const onCanvasClick = () => ({
  type: actionTypes.ON_CANVAS_CLICK,
});

export const showOverlayTable = (payload) => ({
  type: actionTypes.SHOW_OVERLAY_TABLE,
  payload,
});

export const closeOverlayTable = () => ({
  type: actionTypes.CLOSE_OVERLAY_TABLE,
});

export const onTextSearch = (payload) => ({
  type: actionTypes.ON_SEARCH_TEXT,
  payload,
});

export const onSearchTextClear = () => ({
  type: actionTypes.ON_SEARCH_TEXT_CLEAR,
});

export const onClearSection = (payload) => ({
  type: actionTypes.ON_CLEAR_SECTION,
  payload,
});
