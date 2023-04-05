import React, { useState } from 'react';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ViewColumn,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';
import { cellTypes } from '../util/Types';

const ManageColumnView = ({
  table,
  onColumnViewChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { columns } = table;
  const viewColumns = columns.filter((col) => col.role === cellTypes.DISPLAY);

  return (
    <div>
      <Tooltip title="View Columns">
        <IconButton variant="contained" onClick={handleClick}>
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
        <List>
          {viewColumns.map((column) => (
            <ListItem
              width={1}
            >
              <Checkbox
                icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
                onClick={() => onColumnViewChange(column)}
                checked={column.display}
                checkedIcon={(
                  <CheckBoxIcon
                    style={{
                      fontSize: 18,
                    }}
                  />
                )}
                disableRipple
                color="secondary"
              />
              <Typography>{column.header}</Typography>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ManageColumnView;
