/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  TableCell,
  IconButton,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpandIconView = ({
  row = {},
  onRowExpandChange,
}) => (
  <TableCell padding="checkbox">
    {/* <ChevronRightIcon
      disableRipple
      onClick={(event) => onRowSelectChange(event, row)}
      checked={row.isChecked}
    /> */}
    <IconButton
      onClick={(event) => onRowExpandChange(event, row)}
      aria-label="expand"
    >
      {row.isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
    </IconButton>
  </TableCell>
);

export default ExpandIconView;
