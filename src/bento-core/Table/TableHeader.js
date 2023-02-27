import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = ({
  columns,
  onRequestSort,
  order,
  orderBy,
  onSelectAllClick,
}) => {
  
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell>
            {column.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columns: PropTypes.string.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};

export default TableHeader;
