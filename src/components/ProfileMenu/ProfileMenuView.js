import React from 'react';
import {
  IconButton, Menu, MenuItem, Tooltip,
} from '@material-ui/core';
import {
  AccountCircle as AccountIcon,
  Person as PersonIcon,
} from '@material-ui/icons';
import { Typography } from '../Wrappers/Wrappers';
import env from '../../utils/env';

const USER_LOGOUT_URL = env.REACT_APP_USER_LOGOUT_URL;

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const username = JSON.parse(localStorage.getItem('username'));
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function signout() {
    localStorage.removeItem('username');
    localStorage.setItem('isAuthorized', 'false');
    window.location.assign(USER_LOGOUT_URL);
  }

  return (
    <div>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="mail-menu"
        onClick={handleClick}
      >
        <Tooltip title="Profile" placement="bottom-end">
          <AccountIcon />
        </Tooltip>
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <PersonIcon />
          <Typography variant="h4" weight="light">
            {username !== null ? username : ''}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography fontSize="medium" weight="light">
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography fontSize="medium" weight="light">
            My Account
          </Typography>
        </MenuItem>
        <MenuItem onClick={signout}>
          <Typography fontSize="medium" weight="light">
            signout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
