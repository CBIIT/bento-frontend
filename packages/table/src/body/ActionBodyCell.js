import React from 'react';
import { Typography } from '@material-ui/core';
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';
import ExpandIconView from './components/ExpandIconView';
import { cellTypes } from '../util/Types';

const ActionCell = ({
  row,
  onRowSelectChange,
  onRowExpandChange,
  column,
}) => {
  const { cellType } = column;

  if (cellTypes.CHECKBOX === cellType) {
    return (
      <CheckboxView
        row={row}
        onRowSelectChange={onRowSelectChange}
      />
    );
  }

  if (cellTypes.DELETE === cellType) {
    return (
      <DeleteCellView
        row={row}
        column={column}
      />
    );
  }

  if (cellTypes.EXPANDROW === cellType) {
    return (
      <ExpandIconView
        row={row}
        onRowExpandChange={onRowExpandChange}
      />
    );
  }

  return (
    <Typography>
      {row[column.dataField]}
    </Typography>
  );
};

export default ActionCell;
