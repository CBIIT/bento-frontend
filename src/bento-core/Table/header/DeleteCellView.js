import React from 'react';
import {
  TableCell,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';

const DeleteCellView = ({
  openDialogBox,
}) => {
  console.log('delete header cell');
  return (
    <TableCell
      scope="col"
      className="del_all_row"
    >
      <Typography className="del_all_row_text">
        Remove
      </Typography>
      <IconButton aria-label="help" className="del_all_row_btn">
        <ArrowDropDownIcon
          className="del_all_row_btn_icon"
          onClick={openDialogBox}
        />
      </IconButton>
    </TableCell>
  );
};

export default DeleteCellView;
