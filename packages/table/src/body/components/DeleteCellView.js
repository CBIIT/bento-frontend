import React from 'react';
import {
  IconButton,
  TableCell,
} from '@material-ui/core';
import {
  DeleteOutline as DeleteOutlineIcon,
} from '@material-ui/icons';

const DeleteCellView = ({
  column,
  row,
}) => (
  <TableCell
    scope="col"
    className="delete_row"
  >
    <IconButton
      disableRipple
      className="del_row_btn"
      aria-label="delete"
      onClick={() => column.cellEventHandler(row)}
    >
      <DeleteOutlineIcon
        className="del_row_btn_icon"
        fontSize="small"
      />
    </IconButton>
  </TableCell>
);

export default DeleteCellView;
