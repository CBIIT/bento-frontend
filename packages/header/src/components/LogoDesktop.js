import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = () => ({
  logoArea: {
    display: 'flex',
    '& img': {
      width: 'fit-content',
      height: '56px',
      maxWidth: '100%',
    },
    '& .logoContainer': {
      marginTop: '35px',
      maxWidth: '440px',
    },
  },
});

const Logo = ({ headerData = {}, classes }) => (
  <div className={classes.logoArea}>
    <Link
      id="header-logo-home-link"
      className="logoContainer"
      to={headerData.globalHeaderLogoLink}
    >
      <img
        src={headerData.globalHeaderLogo}
        alt={headerData.globalHeaderLogoAltText}
      />
    </Link>
  </div>
);

export default withStyles(styles)(Logo);
