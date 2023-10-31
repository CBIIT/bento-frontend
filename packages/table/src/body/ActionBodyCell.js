import React from 'react';
import { Typography } from '@material-ui/core';
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';
import { cellTypes } from '../util/Types';

const ActionCell = ({
  row,
  onRowSelectChange,
  onDeleteRow,
  column,
}) => {
  const { cellType } = column;

  if (cellTypes.CHECKBOX === cellType) {
    return (
      <CheckboxView
        row={row}
        column={column}
        onRowSelectChange={onRowSelectChange}
      />
    );
  }

  if (cellTypes.DELETE === cellType) {
    return (
      <DeleteCellView
        row={row}
        column={column}
        onDeleteRow={onDeleteRow}
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
