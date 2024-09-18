import React from 'react';
import {
  Checkbox,
  TableCell,
} from '@material-ui/core';

const CheckboxView = ({
  row,
  onRowSelectChange,
}) => (
  <TableCell padding="checkbox">
    <Checkbox
      disableRipple
      onClick={(event) => onRowSelectChange(event, row)}
      checked={row.isChecked}
      inputProps={{
        'aria-label': 'checkbox',
      }}
    />
  </TableCell>
);

export default CheckboxView;
