import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  withStyles, Paper,
} from '@material-ui/core';

const CustomDropdownMenu = ({ classes, handleClick, dropDownElements }) => (
  <>
    <Paper className={classes.paper}>
      <div className={classes.aboutItemsWrapper} id="aboutDropDown">
        {dropDownElements.map((dropDownElementsItem) => (
          <NavLink
            className={classes.link}
            activeStyle={{ color: '#27DBFF' }}
            to={dropDownElementsItem.link}
            onClick={handleClick}
          >
            {dropDownElementsItem.labelText}
          </NavLink>
        ))}
      </div>
    </Paper>
  </>
);

const styles = () => ({
  paper: {
    background: '#142D64',
    width: '170px',
    padding: '0px 16px 16px 16px',
    position: 'absolute',
    marginTop: '-5px',
    borderRadius: '0',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
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
