import React from 'react';
import {
  Button, withStyles, Paper,
} from '@material-ui/core';
// import DropdownItemsMenu from './DropdownItemsMenu';

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
      <Button classes={{ label: classes.logotype, text: classes.buttonRootNoRightPadding }}>
        {userName}
      </Button>
      {displayDropDownMenu
        ? (
          <Paper>
            <Button onClick={signoutLink}>
              signout
            </Button>
          </Paper>
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
  buttonRoot: {
    padding: '9px 20px 0px 20px',
  },
  buttonRootClicked: {
    borderBottom: '2px solid #FFFFFF',
  },
  dropDownicon: {
    fontSize: '18px',
    margin: '0px 0px 0px 0px',
  },
  aboutMenu: {
    display: 'inline-grid',
  },
});

AfterSignIn.defaultProps = {
  navBarstyling: {},
};

export default withStyles(styles)(AfterSignIn);
