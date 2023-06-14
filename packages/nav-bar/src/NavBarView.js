/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tooltip as MuiTooltip,
  Box,
  withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import DropdownMenu from './components/DropdownMenu';

const drawerWidth = 240;

const NavBar = ({
  classes, isSidebarOpened, navBarData,
  navBarCartData, navBarstyling, numberOfCases, components = {},
  externalLinksFlag, externalLinks, LoginComponent,
}) => {
  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  const [clickedEl, setClickedEl] = React.useState(null);
  function handleButtonClickEvent(eventName) {
    setClickedEl(eventName);
  }

  const getCartLabel = (labelType) => {
    switch (labelType) {
      case 'labelUnderCount':
        return (
          <div className={classes.cartCounter2Wrapper}>
            <div className={classes.cartCounter2}>
              {numberOfCases}
            </div>
            <div className={classes.cartLabel}>
              Files
            </div>
          </div>
        );
      default:
        return (
          <span className={classes.badge}>
            <span className={classes.cartCounter}>
              {numberOfCases}
            </span>
          </span>

        );
    }
  };

  const Tooltip = components.Tooltip || MuiTooltip;

  return (
    <AppBar
      position="fixed"
      className={classnames(classes.appBar, {
        [classes.appBarShift]: isSidebarOpened,
      })}
    >
      <Toolbar className={classes.toolbar}>

        {/* Sidebar button */}

        {/* End Sidebar button */}
        <div id="navbar" className={classes.buttonContainer}>
          {navBarData.slice(0, 7).map((navButton, index) => (
            navButton.type === 'dropdown'
              ? (
                <DropdownMenu
                  handleButtonClickEvent={handleButtonClickEvent}
                  clickedEl={clickedEl}
                  index={index}
                  linkText={navButton.labelText}
                  dropDownElements={navButton.dropDownLinks.slice(0, 9)}
                  navBarstyling={navBarstyling}
                  externalLinksFlag={externalLinksFlag}
                  externalLinks={externalLinks}
                />
              )
              : (
                <Box id={`button_navbar_navButton_${index}`} className={classes.logotype} classes={{ root: classes.buttonRoot }}>
                  <HashRouter>
                    <NavLink
                      className={classes.labelText}
                      activeClassName={classes.activeLabel}
                      to={navButton.link ? navButton.link : '/'}
                      onClick={() => handleButtonClickEvent(`${navButton.labelText}`)}
                    >
                      {navButton.labelText}
                    </NavLink>
                  </HashRouter>
                </Box>
              )
          ))}
        </div>
        {/* Start of Theme Switching Icon and logic */}
        <div className={classes.myCasesPosition}>
          <LoginComponent />
          {
            navBarCartData && (
              <Box id="button_navbar_mycases" className={classes.logotype} classes={{ root: classes.buttonRootNoRightPadding }}>
                <HashRouter>
                  <NavLink
                    className={classes.cartLabelText}
                    to={navBarCartData.cartLink}
                  >
                    {navBarCartData.cartLabel}
                    {/* <Badge badgeContent={numberOfCases} max={99999}> */}
                    <Tooltip title="Files" placement="bottom-end">
                      <span className={classes.badge}>
                        <img
                          className={classes.cartIcon}
                          src={navBarCartData.cartIcon}
                          alt={navBarCartData.cartIconAlt}
                        />
                        {getCartLabel(navBarCartData.cartLabelType)}
                      </span>
                    </Tooltip>

                    {/* </Badge> */}
                  </NavLink>
                </HashRouter>
              </Box>
            )
          }
        </div>

      </Toolbar>
    </AppBar>
  );
};

const styles = () => ({
  myCasesPosition: {
    position: 'absolute',
    right: '20px',
  },
  logotype: (props) => ({
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Raleway',
    fontSize: '11px',
    letterSpacing: props.navBarstyling.global.letterSpacing ? props.navBarstyling.global.letterSpacing : '1.25px',
    fontWeight: props.navBarstyling.global.fontWeight ? props.navBarstyling.global.fontWeight : '800',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  }),
  buttonContainer: {
    margin: '0 auto',
  },
  appBar: (props) => ({
    backgroundColor: props.navBarstyling.global.backgroundColor ? props.navBarstyling.global.backgroundColor : '#142D64',
    marginTop: props.navBarstyling.global.marginTop ? props.navBarstyling.global.marginTop : '100px',
    width: '100vw',
  }),
  cartIcon: (props) => ({
    height: props.navBarstyling.cart && props.navBarstyling.cart.iconSize ? props.navBarstyling.cart.iconSize : '22px',
    margin: '0px 0px 0px 6px',
  }),
  labelText: (props) => ({
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Nunito',
    fontSize: '13px',
  }),
  cartLabelText: (props) => ({
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Nunito',
    textTransform: props.navBarstyling.global.textTransform ? props.navBarstyling.global.textTransform : 'UPPERCASE',
    fontSize: '13px',
  }),
  activeLabel: (props) => ({
    borderBottom: props.navBarstyling.global.activeLabel ? props.navBarstyling.global.activeLabel : '1px solid  #FFFFFF',
  }),
  appBarShift: {
    paddingRight: '0px !important',
    width: '100%',
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  toolbar: (props) => ({
    minHeight: props.navBarstyling.global.height ? props.navBarstyling.global.height : '39px',
    paddingRight: props.navBarstyling.global.paddingRight ? props.navBarstyling.global.paddingRight : '45px',
    paddingLeft: props.navBarstyling.global.paddingLeft ? props.navBarstyling.global.paddingLeft : '45px',
    alignItems: 'flex-start',
  }),
  buttonRoot: (props) => ({
    padding: props.navBarstyling.global.padding ? props.navBarstyling.global.padding : '9px 20px 0px 20px',
    border: '0',
    cursor: 'pointer',
    margin: '0',
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    lineHeight: '1.75',
  }),
  buttonRootNoRightPadding: (props) => ({
    padding: props.navBarstyling.cart.padding || props.navBarstyling.global.padding || '9px 20px 0px 20px',
    border: '0',
    cursor: 'pointer',
    margin: '0',
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    lineHeight: '1.75',
  }),
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  cartCounter: {
    height: '16px',
    minWidth: '16px',
    fontFamily: 'inter',
    fontWeight: '600',
    letterSpacing: '0.8px',
    transform: 'scale(1) translate(0%, -50%)',
  },
  cartCounter2Wrapper: {
    marginTop: '-6px',
    marginLeft: '6px',
  },
  cartCounter2: {
    height: '16px',
    minWidth: '16px',
    fontFamily: 'Lato',
    fontWeight: '600',
    letterSpacing: '0.8px',
    textAlign: 'start',
    fontSize: '12px',
  },
  cartLabel: (props) => ({
    height: '16px',
    minWidth: '16px',
    color: props.navBarstyling.cartLabel && props.navBarstyling.cartLabel.color ? props.navBarstyling.cartLabel.color : '#24E4BE',
    fontFamily: 'Raleway',
    fontWeight: '600',
    letterSpacing: '0.8px',
    textAlign: 'start',
    fontSize: '12px',
  }),
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
    // fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  drawerAppBar: {
    height: '45px',
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '100px',
    zIndex: '1201',
    height: 'calc(100% - 100px)',
  },
  // headerMenuButton: {
  //   marginLeft: theme.spacing.unit,
  //   padding: theme.spacing.unit / 2,
  // },
});

NavBar.defaultProps = {
  classes: {},
  navBarstyling: {},
  LoginComponent: () => <></>,
};

const StyledNavBar = withStyles(styles)(NavBar);
export default StyledNavBar;
