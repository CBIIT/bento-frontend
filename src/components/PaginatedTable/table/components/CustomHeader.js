import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  Checkbox,
  FormControlLabel,
  TableSortLabel,
} from '@material-ui/core';

const CustomTableHeader = ({
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
  const includeSelectedIds = Ids.some((id) => selectedRows.includes(id));

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  indeterminate={includeSelectedIds}
                  checked={includeSelectedIds}
                  onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds)}
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

CustomTableHeader.propTypes = {
  table: PropTypes.objectOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  sortByColumn: PropTypes.string.isRequired,
};

const styles = () => ({
});

export default withStyles(styles)(CustomTableHeader);
