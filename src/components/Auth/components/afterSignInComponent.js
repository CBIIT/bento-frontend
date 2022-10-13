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
            <div>
              <Button
                onClick={() => redirectUser(userProfileRoute)}
                classes={{ label: classes.textColor, text: classes.paddding0 }}
                disableRipple
              >
                User Profile
              </Button>
            </div>

            {role === 'admin' ? (
              <div>
                <Button
                  onClick={() => redirectUser(adminPortal)}
                  classes={{ label: classes.textColor, text: classes.paddding0 }}
                  disableRipple
                >
                  Admin Portal
                </Button>
              </div>
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
    color: '#24E4BE',
    fontFamily: 'Raleway',
    fontSize: '15px',
    fontWeight: '600',
    letterSpacing: '1px',
    lineHeight: '13px',
    textTransform: 'capitalize',
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRootNoRightPadding: {
    padding: '6px 0px 0px 20px',
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
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '15px',
    textTransform: 'capitalize',
    fontWeight: '500',
    lineHeight: '30px',
    letterSpacing: '0',
  },
  paper: {
    background: '#465F96',
    // width: '120px',
    paddingLeft: '15px',
    paddingRight: '15px',
    position: 'absolute',
    fontFamily: 'Nunito',
    fontWeight: 600,
    borderRadius: '0',
    marginTop: '11px',
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
