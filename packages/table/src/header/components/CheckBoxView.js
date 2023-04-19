import React from 'react';
import {
  TableCell,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

const CheckboxView = ({
  includeSelectedIds,
  toggleSelectAll,
  Ids,
}) => (
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
);

export default CheckboxView;
