import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  Checkbox,
  FormControlLabel,
  TableSortLabel,
} from '@material-ui/core';
import styles from './HeaderStyle';

const TableHeader = ({
  table,
  rows,
  toggleSelectAll,
  sortByColumn,
}) => {
  const {
    columns,
    selectedRows,
    sortBy,
    sortOrder,
  } = table;
  const Ids = rows.map((row) => row[table.dataKey]);
  const includeIds = Ids.some((id) => selectedRows.includes(id));
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  indeterminate={includeIds}
                  onChange={(event) => toggleSelectAll(event, Ids)}
                />
              )}
            />
          </TableCell>
          {
            columns.map((column) => (
              <TableCell>
                <TableSortLabel
                  active={sortBy === column.dataField}
                  direction={sortOrder}
                  onClick={() => sortByColumn(column.dataField, sortOrder)}
                >
                  {column.header}
                </TableSortLabel>
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    </>
  );
};

export default withStyles(styles)(TableHeader);
