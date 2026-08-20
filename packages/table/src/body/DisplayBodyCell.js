import React from 'react';
import {
  TableCell,
  Typography,
} from '@material-ui/core';
import { cellTypes } from '../util/Types';
import {
  formatValueForDisplay,
  isBracketStripEnabled,
  stripSurroundingBrackets,
} from '../util/Dataformat';
import CustomLinkView from './components/CustomLinkView';
import DataFormatView from './components/DataFormatView';
import CPIView from './components/CPIView';
import CPIMappingView from './components/CPIMappingView';
import StudiesDataAvailabilityView from './components/StudiesDataAvailabilityView';

/**
* Custom Column reneder
*/
const CustomComponent = ({
  row,
  column,
}) => {
  const { dataField, customCellRender } = column;
  const raw = row[dataField];
  const value = isBracketStripEnabled(column)
    ? stripSurroundingBrackets(raw)
    : raw;
  return (
    <>
      {customCellRender({
        ...row,
        ...column,
        [dataField]: value,
        label: value,
      })}
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
  rowIndex,
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
    case cellTypes.CPI_MAPPING:
      return (
        <CPIMappingView
          row={row}
          column={column}
          rowIndex={rowIndex}
          themeConfig={themeConfig}
          navigation={navigation}
        />
      );
    case cellTypes.STUDIES:
      return (
        <StudiesDataAvailabilityView
          row={row}
          column={column}
        />
      );
    default:
      return (
        <Typography>
          {isBracketStripEnabled(column)
            ? formatValueForDisplay(row[column.dataField])
            : row[column.dataField]}
        </Typography>
      );
  }
};

const DisplayCell = ({
  row,
  column,
  rowIndex,
  themeConfig,
  navigation,
}) => (
  <TableCell className={column.dataField}>
    <ViewCell
      row={row}
      column={column}
      rowIndex={rowIndex}
      themeConfig={themeConfig}
      navigation={navigation}
    />
  </TableCell>
);

export default DisplayCell;
