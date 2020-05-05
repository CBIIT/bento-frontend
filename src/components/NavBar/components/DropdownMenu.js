import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  withStyles, Paper,
} from '@material-ui/core';


const CustomDropdownMenu = ({ classes, handleClick }) => (
  <>
    <Paper className={classes.paper}>
      <div className={classes.aboutItemsWrapper} id="aboutDropDown">
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/purpose"
          onClick={handleClick}
        >
               Purpose
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/crdc"
          onClick={handleClick}
        >
               CRDC & Analysis
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/model"
          onClick={handleClick}
        >
               CTDC Data & Model
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/data-dictionary"
          onClick={handleClick}
        >
                CTDC Data Dictionary
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/developers"
          onClick={handleClick}
        >
               Developers
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/support"
          onClick={handleClick}
        >
               Support
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/request-access"
          onClick={handleClick}
        >
               Request Access
        </NavLink>

      </div>
    </Paper>
  </>
);

const styles = () => ({
  paper: {
    background: '#309EC4',
    width: '170px',
    padding: '0px 16px 16px 16px',
    position: 'absolute',
    marginTop: '-5px',
    borderRadius: '0',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Lato',
    fontSize: '13px',
    fontWeight: '800',
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

export default withStyles(styles)(CustomDropdownMenu);
