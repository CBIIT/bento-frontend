import React from 'react';
import {
  TableCell,
  Checkbox,
} from '@material-ui/core';

const label = { inputProps: { 'aria-label': 'Checkbox item' } };

const CheckboxView = ({
  includeSelectedIds,
  toggleSelectAll,
  Ids,
}) => (
  <TableCell padding="checkbox">
    <Checkbox
      {...label}
      color="primary"
      indeterminate={includeSelectedIds}
      checked={includeSelectedIds}
      onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds)}
    />
  </TableCell>
);

export default CheckboxView;
