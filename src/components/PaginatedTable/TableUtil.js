import React from 'react';
import { cellTypes, headerTypes } from '../../bento-core/Table/Types';
import { CustomCellView } from './CustomCell';

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const configColumn = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...displayColumns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};

export const cofig = {};
