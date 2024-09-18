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
}) => {
  const classes = useStyles();
  return (
    <TableCell padding="checkbox" component="td">
      <FormControlLabel
        label="checkbox"
        classes={{
          label: classes.label,
        }}
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
};

export default CheckboxView;
