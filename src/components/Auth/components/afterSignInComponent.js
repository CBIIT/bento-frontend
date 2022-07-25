import React from 'react';
import {
  Button, withStyles, Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// import DropdownItemsMenu from './DropdownItemsMenu';

const getDropDownMenu = (data) => {
  const { classes, signoutLink } = data;

  return (
    <Paper className={classes.paper}>
      <Link className={classes.paperLink} to="/profile">
        User Profile
      </Link>

      <Button
        onClick={signoutLink}
        classes={{ label: classes.textColor, text: classes.paddding0 }}
        disableRipple
      >
        logout
      </Button>
    </Paper>
  );
};

const AfterSignIn = ({
  classes, userName, signoutLink,
}) => {
  const [displayDropDownMenu, setDisplayDropDownMenu] = React.useState(false);

  function handleClick() {
    setDisplayDropDownMenu(true);
  }

  function handleMoveOut() {
    setDisplayDropDownMenu(false);
  }

  // function dropdownMenuClickEvent() {
  //   setDisplayDropDownMenu(false);
  //   handleButtonClickEvent('aboutMenu');
  // }

  return (
    <div
      onMouseEnter={handleClick}
      onMouseLeave={handleMoveOut}
      className={classes.aboutMenu}
    >
      <Button
        classes={{ label: classes.logotype, text: classes.buttonRootNoRightPadding }}
        disableRipple
      >
        {userName}
      </Button>
      {displayDropDownMenu
        ? (
          getDropDownMenu({ classes, signoutLink })
        ) : ''}
    </div>
  );
};

const styles = () => ({
  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.9px',
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRootNoRightPadding: {
    padding: '9px 0px 0px 20px',
  },
  buttonRootClicked: {
    borderBottom: '2px solid #FFFFFF',
  },
  dropDownicon: {
    fontSize: '18px',
    margin: '0px 0px 0px 0px',
  },
  paddding0: {
    padding: '0px',
  },
  aboutMenu: {
    display: 'inline-block',
    height: '39px',
  },
  textColor: {
    color: '#ffffff',
    fontSize: '16px',
    textTrasform: 'normal',
    textTransform: 'capitalize',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    background: '#465F96',
    minWidth: '120px',
    paddingLeft: '20px',
    position: 'absolute',
    fontFamily: 'Nunito',
    fontWeight: 600,
    borderRadius: '0',
    marginTop: '6px',
  },
  paperLink: {
    color: '#ffffff',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontSize: '16px',
    textTransform: 'capitalize',
  },
});

AfterSignIn.defaultProps = {
  navBarstyling: {},
};

export default withStyles(styles)(AfterSignIn);
