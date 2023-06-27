import React from 'react';
import {
  TableRow,
  TableCell,
} from '@material-ui/core';

const ColumnGrouping = ({
  columnGroups = [],
}) => {
  if (columnGroups.length === 0) {
    return null;
  }

  return (
    <TableRow className="column_grouping">
      {columnGroups.map((group) => {
        const {
          title,
          colSpan = 1,
          customViewRender,
          clsName,
        } = group;
        return (
          <TableCell colSpan={colSpan} className={clsName}>
            {customViewRender ? customViewRender() : title}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default ColumnGrouping;
