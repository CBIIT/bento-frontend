import React from 'react';
import clsx from 'clsx';
import {
  TableCell,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { tableCls } from '../util/ClassNames';

const CheckboxView = ({
  classes,
  rootClsName,
  includeSelectedIds,
  toggleSelectAll,
  Ids,
}) => (
  <TableCell padding="checkbox">
    <FormControlLabel
      control={(
        <Checkbox
          className={clsx(`${rootClsName}${tableCls.CHECKBOX}`, {
            [`${rootClsName}${tableCls.CHECKBOX_ACTIVE}`]: includeSelectedIds,
            [`${rootClsName}${tableCls.CHECKBOX_INACTIVE}`]: !includeSelectedIds,
          })}
          classes={{
            root: classes.checkboxRoot,
            checked: classes.checked,
            disabled: classes.disabled,
          }}
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
