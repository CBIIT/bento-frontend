import React from 'react';
import {
  TableCell,
  Checkbox,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  label: {
    opacity: '0',
  },
});

const CheckboxView = ({
  includeSelectedIds,
  toggleSelectAll,
  Ids,
  rows,
}) => {
  const { label } = useStyles();

  return (
    <TableCell padding="checkbox" component="td">
      <FormControlLabel
        label="checkbox"
        classes={{
          label,
        }}
        control={(
          <Checkbox
            color="primary"
            indeterminate={includeSelectedIds}
            checked={includeSelectedIds}
            inputProps={{
              'aria-label': 'checkbox',
            }}
            onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds)}
            onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds, rows)}
          />
        )}
      />
    </TableCell>
  );
};

export default CheckboxView;
