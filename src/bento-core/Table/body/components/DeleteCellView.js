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
      className="delete_row"
    >
      <IconButton
        disableRipple
        className="del_row_btn"
      >
        <DeleteOutlineIcon
          className="del_row_btn_icon"
          fontSize="small"
        />
      </IconButton>
    </TableCell>
  );
};

export default DeleteCellView;
