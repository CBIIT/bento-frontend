import React from 'react';
import { withStyles } from '@material-ui/core';
import Logo from './LogoDesktop';
import NavBar from './NavbarDesktop';

const styles = () => ({
  headerBanner: {
    width: '100%',
  },
  headerContainer: {
    margin: '0 auto',
    paddingLeft: '32px',
    paddingRight: '32px',
    maxWidth: '1400px',
    display: 'flex',
  },
  headerLowerContainer: {
    display: 'flex',
    marginLeft: 'auto',

    '& .searchBarArea': {
      padding: 0,
      marginTop: '35px',
      display: 'flex',
      alignItems: 'center',
    },
  },
});

const Header = ({
  config = {}, endComponent, SearchComponent, classes,
}) => (
  <div
    className={classes.headerBanner}
    data-testid="navigation-header-desktop"
  >
    <div className={classes.headerContainer}>
      <Logo headerData={config.headerData} />
      <div className={classes.headerLowerContainer}>
        {SearchComponent && (
        <div className="searchBarArea">
          {SearchComponent}
        </div>
        )}
      </div>
    </div>
    <div className="navbarContainer">
      <NavBar config={config} endComponent={endComponent} />
    </div>
  </div>
);

export default withStyles(styles)(Header);
