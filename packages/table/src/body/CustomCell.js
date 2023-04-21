import React from 'react';
import {
  TableCell,
  Link,
  Typography,
} from '@material-ui/core';
import { cellTypes } from '../util/Types';
import CustomLinkView from './components/CustomLinkView';
import DataFormatView from './components/DataFormatView';

/**
* Custom Column reneder
*/
const CustomComponent = ({
  row,
  column,
}) => {
  const { dataField, customCellRender } = column;
  return (
    <>
      {customCellRender({ ...row, ...column, label: row[dataField] })}
    </>
  );
};

/**
* data display columns
* @returns default/Link/Custom view
*/
const ViewCell = ({
  column,
  row,
}) => {
  const { cellType } = column;
  switch (cellType) {
    case cellTypes.FORMAT_DATA:
      return (
        <DataFormatView
          row={row}
          column={column}
        />
      );
    case cellTypes.LINK:
      return (
        <CustomLinkView
          row={row}
          column={column}
        />
      );
    case cellTypes.CUSTOM_ELEM:
      return (
        <CustomComponent
          row={row}
          column={column}
        />
      );
    default:
      return (
        <Typography>
          {row[column.dataField]}
        </Typography>
      );
  }
};

const CustomBodyCell = ({
  row,
  column,
}) => (
  <TableCell className={column.dataField}>
    <ViewCell
      row={row}
      column={column}
    />
  </TableCell>
);

export default CustomBodyCell;
