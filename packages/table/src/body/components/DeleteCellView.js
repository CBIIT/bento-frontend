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
  onDeleteRow,
}) => {
  const { customCellRender } = column;
  return (
    <TableCell
      scope="col"
      className="delete_row"
    >
      {
        customCellRender ? (
          <>
            {customCellRender(row, onDeleteRow)}
          </>
        ) : (
          <IconButton
            disableRipple
            className="del_row_btn"
            aria-label="Delete row"
            onClick={() => column.cellEventHandler(row)}
          >
            <DeleteOutlineIcon
              className="del_row_btn_icon"
              fontSize="small"
            />
          </IconButton>
        )
      }
    </TableCell>
  );
};

export default DeleteCellView;
