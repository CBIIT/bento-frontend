import React, { useState } from 'react';
import {
  TableCell,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import RemoveAllDialogView from './RemoveAllDialog';

const TooltipContent = () => (
  <Typography className="remove_all_tooltip">
    {' '}
    Remove
    {' '}
    <b>All</b>
    {' '}
    items in cart.
    {' '}
  </Typography>
);

const DeleteCellView = ({
  column,
  count,
}) => {
  const [displayDialog, setDisplay] = useState(false);
  const toggleDialogDisplay = () => setDisplay(!displayDialog);
  const testTrigger = () => {
    console.log('test');
    setDisplay(true);
  };
  const { customColHeaderRender } = column;
  return (
    <>
      <TableCell
        scope="col"
        className="del_all_row"
      >
        {
          customColHeaderRender ? (
            <>
              {customColHeaderRender(testTrigger)}
            </>
          ) : (
            <>
              <Typography className="del_all_row_text">
                Remove
              </Typography>
              <Tooltip
                id="del_all_row_tooltip"
                className="del_all_row_tooltip"
                title={TooltipContent()}
                renderComponent={TooltipContent()}
              >
                <IconButton aria-label="help" className="del_all_row_btn">
                  <ArrowDropDownIcon
                    className="del_all_row_btn_icon"
                    onClick={toggleDialogDisplay}
                  />
                </IconButton>
              </Tooltip>
            </>
          )
        }
        <RemoveAllDialogView
          open={displayDialog}
          removeAllFiles={column.headerEventHandler}
          count={count}
          toggleDisplay={toggleDialogDisplay}
        />
      </TableCell>
    </>
  );
};

export default DeleteCellView;
