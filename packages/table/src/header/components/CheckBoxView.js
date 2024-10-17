import React from 'react';
import {
  TableCell,
  Checkbox,
} from '@material-ui/core';

const CheckboxView = ({
  includeSelectedIds,
  toggleSelectAll,
  Ids,
}) => (
  <TableCell padding="checkbox" component="td">
    <Checkbox
      color="primary"
      indeterminate={includeSelectedIds}
      checked={includeSelectedIds}
      inputProps={{
        'aria-label': 'checkbox',
      }}
      onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds)}
    />
  </TableCell>
);

export default CheckboxView;
