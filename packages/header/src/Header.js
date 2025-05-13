import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { RouteLinks } from '@bento-core/util';
import nihLogo from './CTDC_Logo.svg';

const styles = () => ({
  grow: {
    flexGrow: 3,
  },
  searchComp: {
    marginRight: '45px',
  },
  headerBar: (props) => {
    const defaultProps = {
      color: '#8A95A7',
      width: '100%',
      height: '100px',
      margin: '0 auto',
      display: 'flex',
      position: 'fixed',
      minHeight: '100px',
      justifyContent: 'space-between',
      top: '0px',
      zIndex: '1201',
      background: '#ffffff',
    };
    return Object.assign(defaultProps, props.customStyle.headerBar);
  },
  nihLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icdcLogoContainer: {
    display: 'flex',
    width: '100%',
    paddingLeft: '24px',
    marginLeft: (props) => props.customStyle.icdcLogoContainerMarginLeft || 'auto',
    background: (props) => `url(${props.easter})` || '',
    overflow: 'hidden',
    '@media (min-width: 2400px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  },
  nihLogoImg: (props) => {
    const defaultProps = {
      minWidth: '200px',
      minHeight: '60px',
      maxHeight: '80px',
      maxWidth: '460px',
      cursor: props.noLink ? 'auto' : 'pointer',
      marginLeft: '45px',
    };
    return Object.assign(defaultProps, props.customStyle.nihLogoImg);
  },
});

const Header = ({ classes, ...props }) => {
  const {
    logo, alt, homeLink, SearchComponent, noLink,
  } = props;
  return (
    <div id="header" className={classes.headerBar}>
      <div className={classes.nihLogoContainer}>
        {
          noLink ? (
            <img
              className={classes.nihLogoImg}
              src={logo}
              alt={alt}
            />
          ) : (
            <RouteLinks to={homeLink || '/'}>
              <img
                className={classes.nihLogoImg}
                src={logo}
                alt={alt}
              />
            </RouteLinks>
          )
        }
      </div>
      <div className={classes.icdcLogoContainer}>
        <div className={classes.grow} />
        <div className={classes.searchComp}><SearchComponent /></div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  logo: nihLogo,
  alt: 'NCI CTDC Logo - Clinical Trials Data Commons',
  customStyle: {},
  SearchComponent: () => <></>,
};

export default withStyles(styles)(Header);
