import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';

const ColumnGrouping = ({
  columnGroups = [],
  columns = [],
}) => {
  if (columnGroups.length === 0) {
    return null;
  }

  const getColSpan = (indexes = [0, 0]) => {
    const startIndex = indexes[0];
    const endIndex = indexes[1];
    const displayGroupCols = columns
      .map((col, index) => ((startIndex <= index && index <= endIndex) && col.display))
      .filter((item) => item);
    return displayGroupCols.length;
  };

  return (
    <TableRow className="column_grouping">
      {columnGroups.map((group) => {
        const {
          title,
          customViewRender,
          clsName,
          columnIndexes,
        } = group;
        if (!columnIndexes) {
          return (
            <Typography variant="subtitle1" color="error" size="sm">
              Missing columnIndexes [startColIndex, endColIndex]
            </Typography>
          );
        }
        const colSpan = getColSpan(columnIndexes);
        if (colSpan > 0) {
          return (
            <TableCell colSpan={colSpan} className={clsName}>
              {customViewRender ? customViewRender() : title}
            </TableCell>
          );
        }
        return null;
      })}
    </TableRow>
  );
};

export default ColumnGrouping;
