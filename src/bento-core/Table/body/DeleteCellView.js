import React from 'react';
import {
  IconButton,
  TableCell,
} from '@material-ui/core';
import {
  DeleteOutline as DeleteOutlineIcon,
} from '@material-ui/icons';

const DeleteCellView = () => {
  console.log('delete header cell');
  return (
    <TableCell
      scope="col"
      className="delete_all_row"
    >
      <IconButton
        disableRipple
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </TableCell>
  );
};

export default DeleteCellView;
