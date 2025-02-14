import React from 'react';
import { cellTypes } from '../util/Types';
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';

const ActionHeaderCell = ({
  includeSelectedIds,
  toggleSelectAll,
  onDeleteAllFiles,
  Ids,
  count,
  rows,
  column,
}) => {
  const { cellType } = column;

  if (cellTypes.CHECKBOX === cellType) {
    return (
      <CheckboxView
        includeSelectedIds={includeSelectedIds}
        toggleSelectAll={toggleSelectAll}
        Ids={Ids}
        rows={rows}
      />
    );
  }

  if (cellTypes.DELETE === cellType) {
    return (
      <DeleteCellView
        rows={rows}
        count={count}
        column={column}
        onDeleteAllFiles={onDeleteAllFiles}
      />
    );
  }

  return (
    <></>
  );
};

export default ActionHeaderCell;
