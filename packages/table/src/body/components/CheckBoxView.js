import React from 'react';
import {
  Checkbox,
  TableCell,
} from '@material-ui/core';

const label = { inputProps: { 'aria-label': 'Checkbox item' } };

const CheckboxView = ({
  row,
  onRowSelectChange,
}) => (
  <TableCell padding="checkbox">
    <Checkbox
      {...label}
      disableRipple
      onClick={(event) => onRowSelectChange(event, row)}
      checked={row.isChecked}
    />
  </TableCell>
);

export default CheckboxView;
