import React, { useState } from 'react';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  ViewColumn,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  Close,
} from '@material-ui/icons';
import { cellTypes } from '../util/Types';

const ManageColumnView = ({
  table,
  onColumnViewChange,
  manageViewColumns,
}) => {
  if (!manageViewColumns) {
    return null;
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleDisplay = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const { columns } = table;
  const viewColumns = columns.filter((col) => col.role === cellTypes.DISPLAY);

  return (
    <>
      <Tooltip title={manageViewColumns.title}>
        <IconButton
          variant="contained"
          onClick={toggleDisplay}
          className="manageViewColumnBtn"
        >
          <ViewColumn />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography variant="caption" className="viewColumnText">
          {manageViewColumns.title}
        </Typography>
        <IconButton
          onClick={handleClose}
          className="closeIcon"
        >
          <Close />
        </IconButton>
        <List className="viewColumnList">
          {viewColumns.map((column) => (
            <ListItem
              width={1}
              className="viewColumnListItem"
            >
              <Checkbox
                icon={(
                  <CheckBoxBlankIcon
                    className="checkBoxIcon"
                  />
                )}
                onClick={() => onColumnViewChange(column)}
                checked={column.display}
                checkedIcon={(
                  <CheckBoxIcon
                    className="checkBoxIcon"
                  />
                )}
                disableRipple
                color="secondary"
                className="checkBox"
                inputProps={{ 'aria-label': 'checkbox' }}
              />
              {column.icon && (
                <img src={column.icon} alt={column.header} className={column.dataField} />
              )}
              <Typography>{column.header}</Typography>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

const styles = () => ({
  root: {
    padding: '16px 24px 16px 24px',
    fontFamily: 'Roboto',
  },
  title: {
    marginRight: '24px',
    fontSize: '14px',
    color: '#0B3556',
    textAlign: 'left',
    fontWeight: 500,
  },
  formGroup: {
    marginTop: '8px',
  },
  formControl: {},
  checkbox: {
    padding: '0px',
    width: '32px',
    height: '32px',
  },
  checkboxRoot: {
    '&$checked': {
      color: '#0B3556',
    },
  },
  checked: {},
  label: {
    fontSize: '15px',
    marginLeft: '8px',
  },
});

export default withStyles(styles)(ManageColumnView);
