import React from 'react';
import {
  TableCell,
  Checkbox,
} from '@material-ui/core';

const label = { inputProps: { 'aria-label': 'Select all checkbox' } };

const CheckboxView = ({
  includeSelectedIds,
  toggleSelectAll,
  Ids,
  rows,
}) => (
  <TableCell padding="checkbox">
    <span style={{ display: 'none' }}>Select all</span>
    <Checkbox
      {...label}
      color="primary"
      indeterminate={includeSelectedIds}
      checked={includeSelectedIds}
      onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds, rows)}
    />
  </TableCell>
);

export default CheckboxView;
