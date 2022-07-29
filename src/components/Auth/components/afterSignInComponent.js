import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button, withStyles, Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { requestAccessRoute, adminPortal, userProfileRoute } from '../../../bento/siteWideConfig';
// import DropdownItemsMenu from './DropdownItemsMenu';

const AfterSignIn = ({
  classes, userName, signoutLink,
}) => {
  const [displayDropDownMenu, setDisplayDropDownMenu] = React.useState(false);

  const { role } = useSelector((state) => state.login);
  const history = useHistory();

  function handleClick() {
    setDisplayDropDownMenu(true);
  }

  function handleMoveOut() {
    setDisplayDropDownMenu(false);
  }

  function redirectUser(path) {
    history.push(path);
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
          <Paper className={classes.paper}>
            {role === 'admin' ? (
              <Button
                onClick={() => redirectUser(adminPortal)}
                classes={{ label: classes.textColor, text: classes.paddding0 }}
                disableRipple
              >
                Admin Portal
              </Button>
            )
              : (
                <div>
                  <Button
                    onClick={() => redirectUser(requestAccessRoute)}
                    classes={{ label: classes.textColor, text: classes.paddding0 }}
                    disableRipple
                  >
                    Request Access
                  </Button>
                </div>
              )}
            <div>
              <Button
                onClick={() => redirectUser(userProfileRoute)}
                classes={{ label: classes.textColor, text: classes.paddding0 }}
                disableRipple
              >
                User Profile
              </Button>
            </div>
            <Button
              onClick={signoutLink}
              classes={{ label: classes.textColor, text: classes.paddding0 }}
              disableRipple
            >
              logout
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
    paddding: '0px',
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
    background: '#465F96',
    // width: '120px',
    paddingLeft: '20px',
    position: 'absolute',
    fontFamily: 'Nunito',
    fontWeight: 600,
    borderRadius: '0',
    marginTop: '6px',
  },
  badge: {
    textTransform: 'capitalize',
  },
  profileIcon: {
    paddingBottom: '0px',
    marginBottom: '-8px',
  },
});

AfterSignIn.defaultProps = {
  navBarstyling: {},
};

export default withStyles(styles)(AfterSignIn);
