import React from 'react';
import { useMediaQuery, withStyles } from '@material-ui/core';
import HeaderDesktop from './components/HeaderDesktop';
import HeaderTabletAndMobile from './components/HeaderTabletAndMobile';
import USABanner from './components/USABanner';
import * as HeaderConfig from './config/HeaderConfig';
// import nihLogo from './CTDC_Logo.svg';

const styles = () => ({
  header: {
    backgroundColor: '#FFFFFF',
  },
});

const Header = ({ config, endComponent, classes }) => {
  const tabletAndMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <header className={classes.header}>
      <USABanner />
      {tabletAndMobile ? (
        <HeaderTabletAndMobile config={config} />
      ) : (
        <HeaderDesktop config={config} endComponent={endComponent} />
      )}
    </header>
  );
};

// TODO: Adjust to prop drilling
Header.defaultProps = {
  config: HeaderConfig,
  // logo: nihLogo,
  // alt: 'NCI CTDC Logo - Clinical Trials Data Commons',
  // homeLink: '/',
  // customStyle: {},
  // SearchComponent: () => <></>,
};

export default withStyles(styles)(Header);
