import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = () => ({
  logoArea: {
    display: 'flex',

    '& .logoContainer': {
      marginTop: '32px',
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
        src={headerData.globalHeaderLogoSmall}
        alt={headerData.globalHeaderLogoAltText}
      />
    </Link>
  </div>
);

export default withStyles(styles)(Logo);
