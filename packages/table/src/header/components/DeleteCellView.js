import React, { useCallback, useState } from 'react';
import {
  TableCell,
  Typography,
  IconButton,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import MuiTooltip from '@material-ui/core/Tooltip';
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
  classes,
  column,
  count,
  onDeleteAllFiles,
}) => {
  const [displayDialog, setDisplay] = useState(false);
  const toggleDialogDisplay = () => setDisplay(!displayDialog);
  const { customColHeaderRender } = column;

  const CustomTooltip = useCallback(({ children }) => {
    // return custom tooltips
    if (column && column.Tooltip) {
      const CustomToolTip = column.Tooltip;
      return (
        <CustomToolTip>
          {children}
        </CustomToolTip>
      );
    }
    // return default tooltip
    if (column && column.tooltipText) {
      return (
        <MuiTooltip id="header-tooltip" title={column.tooltipText}>
          {children}
        </MuiTooltip>
      );
    }
    // return default view
    return <>{children}</>;
  }, [column]);

  return (
    <>
      <TableCell
        scope="col"
        className="del_all_row"
      >
        {
          customColHeaderRender ? (
            <>
              {customColHeaderRender(toggleDialogDisplay)}
            </>
          ) : (
            <span className={classes.cellContentWrapper}>
              <CustomTooltip>
                <Typography component="span" className={`del_all_row_text ${classes.delAllRowText}`}>
                  Remove
                </Typography>
              </CustomTooltip>
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
            </span>
          )
        }
        <RemoveAllDialogView
          open={displayDialog}
          removeAllFiles={column.headerEventHandler}
          count={count}
          toggleDisplay={toggleDialogDisplay}
          onDeleteAllFiles={onDeleteAllFiles}
        />
      </TableCell>
    </>
  );
};

const styles = () => ({
  cellContentWrapper: {
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  delAllRowText: {
    lineHeight: '24px',
  },
});

export default withStyles(styles)(DeleteCellView);
