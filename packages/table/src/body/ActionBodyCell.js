import React from 'react';
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';
import { Typography } from '@material-ui/core';
import { cellTypes } from '../util/Types';

const ActionCell = ({
  row,
  onRowSelectChange,
  column,
}) => {
  const { cellType } = column;

  if (cellTypes.CHECKBOX === cellType) {
    return (
      <CheckboxView
        row={row}
        onRowSelectChange={onRowSelectChange}
      />
    )
  }

  if (cellTypes.DELETE === cellType) {
    return (
      <DeleteCellView
        row={row}
        column={column}
      />
    );
  }

  return (
    <Typography>
      {row[column.dataField]}
    </Typography>
  );
}

export default ActionCell;
