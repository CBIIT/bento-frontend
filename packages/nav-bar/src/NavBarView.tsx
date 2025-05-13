/* eslint-disable react/jsx-no-bind */
import React, { CSSProperties as RCSSProperties } from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tooltip as MuiTooltip,
  Box,
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import classnames from 'classnames';
import DropdownMenu from './components/DropdownMenu';
import { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles';

const drawerWidth = 240;

interface GloablNavBarStyles {
  fontColor?: CSSProperties['color'];
  labelTextFontSize?: CSSProperties['fontSize'];
  cartLabelFontSize?: CSSProperties['fontSize'];
  cartLabelFontWeight?: CSSProperties['fontWeight'];
  cartLabelLetterSpacing?: CSSProperties['letterSpacing'];
  activeLabel?: CSSProperties['border'];
  fontFamily?: CSSProperties['fontFamily'];
  letterSpacing?: CSSProperties['letterSpacing']
  fontWeight?: CSSProperties['fontWeight']
  backgroundColor?: CSSProperties['backgroundColor']
  marginTop?: CSSProperties['marginTop']
  textTransform?: CSSProperties['textTransform']
  height?: CSSProperties['height']
  paddingRight?: CSSProperties['paddingRight']
  paddingLeft?: CSSProperties['paddingLeft']
  paddingTop?: CSSProperties['paddingTop']
  paddingBottom?: CSSProperties['paddingBottom']
  alignItems?: CSSProperties['alignItems']
  padding?: CSSProperties['padding']

}

interface NavBarStyling {
  cart?: {
    iconSize?: string;
  };
  cartLabel?: CSSProperties;
  dropDownMenuButton?: CSSProperties;
  cartCounter?: CSSProperties;
  labelText?: CSSProperties;
  global?: GloablNavBarStyles;
  dropdownButtonRoot?: CSSProperties;
  aboutMenu?: CSSProperties;
  myCasesPosition?: CSSProperties;
  buttonRootNoRightPadding?: CSSProperties;
  buttonRoot?: CSSProperties;
  buttonContainer?: CSSProperties;
  myFiles?: CSSProperties;
  dropDownIcon?: CSSProperties;
  dropdownMenu?: {
    paper?: CSSProperties;
    link?: CSSProperties;
  };
}


// interface NavBarClasses {
//   myCasesPosition: string;
//   logotype: string;
//   buttonContainer: string;
//   appBar: string;
//   cartIcon: string;
//   labelText: string;
//   cartLabelText: string;
//   activeLabel: string;
//   appBarShift: string;
//   drawer: string;
//   toolbar: string;
//   buttonRoot: string;
//   buttonRootNoRightPadding: string;
//   badge: string;
//   cartCounter: string;
//   cartCounter2Wrapper: string;
//   cartCounter2: string;
//   cartLabel: string;
//   iconButtonRoot: string;
//   floatRight: string;
//   floatLeft: string;
//   funnelLogoImg: string;
//   clearAllButtonRoot: string;
//   customButton: string;
//   drawerAppBar: string;
//   drawerPaper: string;
// }



interface NavBarProps extends WithStyles {
  isSidebarOpened: boolean;
  navBarData: {
    labelText: string;
    type: 'link' | 'dropdown';
    link?: string;
    dropDownLinks?: {
      labelText: string;
      link: string;
      linkActiveStyle: string;
    }[]
  }[];
  navBarCartData: {
    cartIcon: string;
    cartIconAlt: string;
    cartLabel: string;
    cartLink: string;
  };
  navBarstyling: NavBarStyling;
  numberOfCases: number;
  components: any;
  externalLinksFlag: boolean;
  externalLinks: any[];
  LoginComponent: any;
  externalLinksFirst: boolean;
}

const NavBar = ({
  classes, isSidebarOpened, navBarData, externalLinksFirst,
  navBarCartData, navBarstyling, numberOfCases, components = {},
  externalLinksFlag, externalLinks, LoginComponent,
}: NavBarProps) => {
  console.log('check navBar props', {
    classes, isSidebarOpened, navBarData,
    navBarCartData, navBarstyling, numberOfCases, components,
    externalLinksFlag, externalLinks, LoginComponent,
  })
  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  const [clickedEl, setClickedEl] = React.useState(null);
  function handleButtonClickEvent(eventName: string) {
    setClickedEl(eventName);
  }

  const getCartLabel = (labelType: string) => {
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
                  externalLinksFirst={externalLinksFirst}
                />
              )
              : (
                <Box id={`button_navbar_navButton_${index}`} className={classes.logotype}>
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
              <Box id="button_navbar_mycases" className={classes.logotype}>
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
                        {/*getCartLabel(navBarCartData.cartLabelType)*/}
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

const styles = (_theme: Theme) => createStyles({
  myCasesPosition: (props: NavBarProps) => ({
    ...(props.navBarstyling.myCasesPosition || {
      position: 'absolute',
      right: '20px',
    }),
  }),
  logotype: (props) => ({
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily || 'Raleway',
    fontSize: '11px',
    letterSpacing: props.navBarstyling.global.letterSpacing || '1.25px',
    fontWeight: props.navBarstyling.global.fontWeight || 800,
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  }),
  buttonContainer: (props: NavBarProps) => ({
    margin: '0 auto',
    ...(props.navBarstyling.buttonContainer || {}),
  }),
  appBar: (props: NavBarProps) => ({
    backgroundColor: props.navBarstyling.global.backgroundColor || '#142D64',
    marginTop: props.navBarstyling.global.marginTop || '100px',
    width: '100vw',
  }),
  cartIcon: (props: NavBarProps) => ({
    height: props.navBarstyling.cart?.iconSize || '22px',
    width: props.navBarstyling.cart?.iconSize || '22px',
    margin: '0px 0px 0px 6px',
  }),
  labelText: (props: NavBarProps) => ({
    ...(props.navBarstyling.labelText || {}),
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor || '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily || 'Nunito',
    fontSize: props.navBarstyling.global.labelTextFontSize || '13px',
  }),
  cartLabelText: (props: NavBarProps) => ({
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor || '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily || 'Nunito',
    textTransform: props.navBarstyling.global.textTransform || 'uppercase',
    fontSize: props.navBarstyling.global.cartLabelFontSize || '13px',
    fontWeight: props.navBarstyling.global.cartLabelFontWeight || 600,
    letterSpacing: props.navBarstyling.global.cartLabelLetterSpacing || '1px',
  }),
  activeLabel: (props: NavBarProps) => ({
    borderBottom: props.navBarstyling.global.activeLabel || '1px solid #FFFFFF',
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
  toolbar: (props: NavBarProps) => ({
    minHeight: props.navBarstyling.global.height || '39px',
    paddingRight: props.navBarstyling.global.paddingRight || '45px',
    paddingLeft: props.navBarstyling.global.paddingLeft || '45px',
    alignItems: props.navBarstyling.global.alignItems || 'flex-start',
    paddingTop: props.navBarstyling.global.paddingTop || '0px',
    paddingBottom: props.navBarstyling.global.paddingBottom || '0px',
  }),
  buttonRoot: (props: NavBarProps) => ({
    padding: props.navBarstyling.global.padding || '9px 20px 0px 20px',
    ...(props.navBarstyling.buttonRoot || {
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
  }),
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  cartCounter: (props: NavBarProps) => ({
    height: '16px',
    minWidth: '16px',
    transform: 'scale(1) translate(0%, -50%)',
    ...(props.navBarstyling.cartCounter || {
      fontFamily: 'inter',
      fontWeight: 600,
      letterSpacing: '0.8px',
    }),
  }),
  cartLabel: (props: NavBarProps) => ({
    height: '16px',
    minWidth: '16px',
    color: props.navBarstyling.cartLabel?.color || '#24E4BE',
    fontFamily: 'Raleway',
    fontWeight: 600,
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
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '100px',
    zIndex: 1201,
    height: 'calc(100% - 100px)',
  },
});

NavBar.defaultProps = {
  classes: {},
  navBarstyling: {},
  LoginComponent: () => <></>,
};

const StyledNavBar = withStyles(styles)(NavBar);
export default StyledNavBar;
