import React from 'react';
import queryString from 'query-string';
import { withRouter, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Button,
  Toolbar,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
// import { useTheme } from '../ThemeContext';
import caseIcon from '../../assets/icons/Icon-MyCases.svg';

import { initCart } from '../../pages/selectedCases/selectedCasesState';
import AboutMenu from './components/AboutMenu';

const drawerWidth = 240;
// const FENCE_LOGIN_URL = process.env.FENCE_LOGIN_URL;
// const FENCE_LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
const BACKEND_GETUSERINFO_API = process.env.REACT_APP_BACKEND_GETUSERINFO_API;

const NavBar = ({
  classes, isSidebarOpened,
}) => {
  // const theme = useTheme();
  const [authState, setAuthState] = React.useState({
    isAuthorized: localStorage.getItem('isAuthorized') === 'true',
  });

  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  const dispatch = useDispatch();
  const [clickedEl, setClickedEl] = React.useState(null);

  function handleButtonClickEvent(eventName) {
    setClickedEl(eventName);
  }

  React.useEffect(() => {
    dispatch(initCart());
    const values = queryString.parse(window.location.search);

    if (values.code) {
      fetch(BACKEND_GETUSERINFO_API + values.code)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((result) => {
          setAuthState({
            ...authState,
            isAuthorized: true,
          });
          localStorage.setItem('username', JSON.stringify(result.user));
          localStorage.setItem('isAuthorized', 'true');
        })
        .catch(() => {
          // Ajay Need to update this
          // setAuthState(
          //  { ...authState, username: "", isAuthorized: false }
          //  );
          // localStorage.setItem("isAuthorized", "false");
        });
    }
  }, []);

  const numberOfCases = useSelector((state) => {
    if (state.cart.cases) {
      return state.cart.cases.length;
    }
    return 0;
  });

  // const activeFilters = useSelector((state) => (
  //   state.dashboard.datatable
  //     && state.dashboard.datatable.filters
  //     ? state.dashboard.datatable.filters : []));
  return (
    <>
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: isSidebarOpened,
        })}
        color="primary"
      >
        <Toolbar className={classes.toolbar}>

          {/* Sidebar button */}

          {/* End Sidebar button */}
          <div id="navbar" className={classes.buttonContainer}>
            <Button id="button_navbar_home" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
              <NavLink
                className={classes.firstLink}
                activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
                to="/home"
                onClick={() => handleButtonClickEvent('home')}
              >
              home
              </NavLink>
            </Button>
            <Button id="button_navbar_trials" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
              <NavLink
                className={classes.link}
                activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
                to="/trials"
                onClick={() => handleButtonClickEvent('trials')}
              >
              Trials
              </NavLink>

            </Button>

            <Button id="button_navbar_cases" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
              <NavLink
                className={classes.link}
                activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
                to="/cases"
                onClick={() => handleButtonClickEvent('cases')}
              >
              Cases
              </NavLink>
            </Button>
            <AboutMenu handleButtonClickEvent={handleButtonClickEvent} clickedEl={clickedEl} />
          </div>
          {/* <div className={classes.grow} /> */}
          {/* Start of Theme Switching Icon and logic */}
          {/* <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={() => {
              theme.toggleTheme();
            }}
            className={classes.headerMenuButton}
            classes={{ root: classes.iconButtonRoot }}
          >
            <Tooltip title="Light/Dark Theme" placement="bottom-end">
              <ColorLensIcon classes={{ root: classes.headerIcon }} />
            </Tooltip>
          </IconButton> */}
          {/* Start of Theme Switching Icon and logic */}
          <div className={classes.myCasesPosition}>
            <Button id="button_navbar_mycases" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRootNoRightPadding }}>
              <NavLink
                className={classnames(classes.link, classes.myCasesLink)}
                to="/myCases"
              >
            My Cases
                {/* <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                className={classes.headerMenuButton}
                classes={{ root: classes.iconButtonRoot }}
              > */}
                {/* <Badge badgeContent={numberOfCases} max={99999}> */}

                <Tooltip title="Cases" placement="bottom-end">
                  <span className={classes.badge}>
                    <img
                      className={classes.cartLogoImg}
                      src={caseIcon}
                      alt="cart_logo"
                    />
                    <span className={classes.badgeText}>
                      {numberOfCases}
                    </span>
                  </span>
                </Tooltip>

                {/* </Badge> */}
                {/* </IconButton> */}
              </NavLink>
            </Button>
          </div>
          {/* Login button functionality on Navigation bar */}

          {/* {authState.isAuthorized ? (
            <ProfileMenu />
          ) : (
            <Button href={FENCE_LOGIN_URL} color="inherit">
              LOGIN
            </Button>
          )} */}
          {/* End Login button functionality on Navigation bar */}

        </Toolbar>
      </AppBar>
      {/* { (location.pathname === '/cases') && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isSidebarOpened}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerAppBar}>
            <div className={classes.floatLeft}>
              <Button
                variant="outlined"
                disabled={activeFilters.length === 0}
                onCl
                className={classes.customButton}
                classes={{ root: classes.clearAllButtonRoot }}
                onClick={() => dispatch(toggleCheckBox(unselectFilters(activeFilters)))}
                disableRipple
              >
              Clear All
              </Button>
            </div>
            <div className={classes.floatRight} onClick={toggleSidebar}>
              <IconButton classes={{ root: classes.iconCartButtonRoot }}>
                <img
                  className={classes.funnelLogoImg}
                  src={funnelIconBlue}
                  alt="funnel_image"
                />
              </IconButton>
            </div>
          </div>
          <Divider />
          <SideBarContent />
        </Drawer>
      )} */}
    </>
  );
};


const styles = (theme) => ({
  myCasesPosition: {
    position: 'absolute',
    right: '20px',
  },
  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '11px',
    letterSpacing: '1.25px',
    fontWeight: '800',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonContainer: {
    margin: '0 auto',
  },
  appBar: {
    marginTop: '100px',
    width: '100vw',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  cartLogoImg: {
    width: '22px',
    height: '22px',
    marginLeft: '6px',
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerMenu: {
    marginTop: theme.spacing.unit * 7,
  },
  headerMenuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing.unit,
    padding: theme.spacing.unit / 2,
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing.unit * 2,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerIconCollapse: {
    color: 'white',
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.text.hint,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  messageNotification: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
  },
  messageNotificationBodySide: {
    alignItems: 'flex-start',
    marginRight: 0,
  },
  sendMessageButton: {
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textTransform: 'none',
  },
  firstLink: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    fontFamily: 'Lato',
    fontSize: '13px',
  },
  sendButtonIcon: {
    marginLeft: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    fontFamily: 'Lato',
    fontSize: '13px',
  },
  myCasesLink: {
    color: '#B91F40',
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
  },
  appBarShift: {
    paddingRight: '0px !important',
    width: '100%',
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '100px',
    zIndex: '1201',
    height: 'calc(100% - 100px)',
  },
  toolbar: {
    minHeight: 39,
    paddingRight: '35px',
    paddingLeft: '35px',
    alignItems: 'flex-start',
  },
  buttonRoot: {
    paddingTop: '9px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  buttonRootNoRightPadding: {
    paddingTop: '9px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  iconButtonRoot: {
    paddingTop: '9px',
    paddingLeft: '0px',
  },
  floatRight: {
    float: 'right',
  },
  floatLeft: {
    float: 'left',
    marginTop: '6px',
    marginLeft: '10px',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '100px',
    borderLeft: '0px',
    minHeight: '20px',
    fontSize: 9,
    textTransform: 'none',
    color: 'black',
    marginLeft: '16px',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  drawerAppBar: {
    height: '39px',
  },
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  badgeText: {
    height: '16px',
    color: '#0E273A',
    minWidth: '16px',
    fontWeight: '600',
    letterSpacing: '0.8px',
    transform: 'scale(1) translate(0%, -50%)',
  },
});

export default withRouter(withStyles(styles)(NavBar));
