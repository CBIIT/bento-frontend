import React from 'react';
import { cellTypes } from '../util/Types';
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';
import ExpandIconView from '../body/components/ExpandIconView';

const ActionHeaderCell = ({
  includeSelectedIds,
  toggleSelectAll,
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
      />
    );
  }

  if (cellTypes.DELETE === cellType) {
    return (
      <DeleteCellView
        rows={rows}
        count={count}
        column={column}
      />
    );
  }

  if (cellTypes.EXPANDROW === cellType) {
    return (
      <ExpandIconView
        rows={rows}
        count={count}
        column={column}
      />
    );
  }

  return (
    <></>
  );
};

export default ActionHeaderCell;
