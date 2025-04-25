import React from 'react';
import {
  TableCell,
  Typography,
} from '@material-ui/core';
import { cellTypes } from '../util/Types';
import CustomLinkView from './components/CustomLinkView';
import DataFormatView from './components/DataFormatView';
import CPIView from './components/CPIView';

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
  themeConfig,
  navigation,
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
    case cellTypes.CPI:
      return (
        <CPIView
          row={row}
          column={column}
          themeConfig={themeConfig}
          navigation={navigation}
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

const DisplayCell = ({
  row,
  column,
  themeConfig,
  navigation,
}) => (
  <TableCell className={column.dataField}>
    <ViewCell
      row={row}
      column={column}
      themeConfig={themeConfig}
      navigation={navigation}
    />
  </TableCell>
);

export default DisplayCell;
