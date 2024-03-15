export const CHECKBOX = 'CHECKBOX';
export const DELETE = 'DELETE';
export const CUSTOM_ELEM = 'CUSTOM_ELEM';
export const LINK = 'LINK';
export const EXTERNAL_LINK = 'EXTERNAL_LINK';
export const CONDITIONAL_EXTERNAL_LINK = 'CONDITIONAL_EXTERNAL_LINK';
export const DISPLAY = 'DISPLAY';
export const DEFAULT = 'DEFAULT';
export const FORMAT_DATA = 'FORMAT_DATA';
export const FORMAT_BYTES = 'FORMAT_BYTES';
export const TRANSFORM = 'TRANSFORM';

export const cellTypes = {
  CUSTOM_ELEM,
  LINK,
  EXTERNAL_LINK,
  CONDITIONAL_EXTERNAL_LINK,
  DISPLAY,
  CHECKBOX,
  DELETE,
  DEFAULT,
  FORMAT_DATA,
};

export const cellStyles = {
  TRANSFORM,
};

export const actionCellTypes = [CHECKBOX, DELETE];

export const FORMAT_DATA_CELLS = [FORMAT_BYTES];

export const dataFormatTypes = {
  FORMAT_BYTES: 'FORMAT_BYTES',
};

export const headerTypes = {
  CUSTOM_ELEM,
  DELETE,
  DEFAULT,
};

export const ComponentTypes = {
  PAGINATION: 'PAGINATION',
  MANAGE_VIEW_COLUMNS: 'MANAGE_VIEW_COLUMNS',
  DOWNLOAD_TABLE_BTN: 'DOWNLOAD_TABLE_BTN',
  CUSTOM_ELEM: 'CUSTOM_ELEM',
};
