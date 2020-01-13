import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button, Menu, withStyles, Paper, Fade,
} from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const AboutMenu = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        variant="h6"
        weight="medium"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.logotype}
        classes={{ root: classes.buttonRoot }}
        disableRipple
      >
        About
        <ExpandMoreRoundedIcon className={classes.icon} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            marginTop: '-8px',
            marginLeft: '40px',
            borderRadius: '0px',
            background: '#309EC4',
          },
        }}
      >
        <Paper className={classes.paper}>
          <div className={classes.aboutItemsWrapper}>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/purpose"
            >
               Purpose
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/steeringCommittee"
            >
               Steering Committee
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/crdc"
            >
               CRDC & Analysis
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/model"
            >
               ICDC Data & Model
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/developers"
            >
               Developers
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/support"
            >
               Support
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ color: 'white' }}
              to="/submit"
            >
               Submitting Data
            </NavLink>

          </div>
        </Paper>
      </Menu>
    </>
  );
};

const styles = (theme) => ({
  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.9px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttonRoot: {
    paddingTop: '9px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  icon: {
    fontSize: '18px',
  },
  paper: {
    background: '#309EC4',
    padding: '6px 16px 16px 16px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: '600',
    lineSpacing: '1px',
    display: 'block',
    marginTop: '13px',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },
  aboutItemsWrapper: {
    maxWidth: '150px',
  },
});

export default withStyles(styles)(AboutMenu);
