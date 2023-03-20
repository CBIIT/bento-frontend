import React from 'react';
import {
  Checkbox,
  TableCell,
} from '@material-ui/core';
import clsx from 'clsx';
import { tableCls } from '../util/ClassNames';

const CheckboxView = ({
  rootClsName,
  row,
  onRowSelectChange,
}) => (
  <TableCell padding="checkbox">
    <Checkbox
      className={clsx({
        [`${rootClsName}${tableCls.CHECKBOX_ACTIVE}`]: row.isChecked,
      })}
      disableRipple
      onClick={(event) => onRowSelectChange(event, row)}
      checked={row.isChecked}
    />
  </TableCell>
);

export default CheckboxView;
