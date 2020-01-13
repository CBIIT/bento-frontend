import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import nihLogo from '../../assets/header/icdc_nih_logo.svg';
// import icdcLogo from '../../assets/header/icdc_logo_white.svg';
import cancergraphic400 from '../../assets/header/Canine400.png';
import cancergraphic800 from '../../assets/header/Canine800.png';
import cancergraphic1400 from '../../assets/header/Canine1400.png';
import cancergraphic1600 from '../../assets/header/Canine1600.png';
import cancergraphic1800 from '../../assets/header/Canine1800.png';
import cancergraphic2000 from '../../assets/header/Canine2000.png';


// import classes from '*.module.sass';

/**
 * Header
 */

const Header = ({ classes }) => (
  <div className={classes.headerBar}>
    <div className={classes.nihLogoContainer}>
      <Link to="/home">
        <img
          className={classes.nihLogoImg}
          src={nihLogo}
          alt="NCI ICDC Logo - Integrated Canine Data Commons"
        />
      </Link>
      {/* <img
        src={cancergraphic}
        alt="cancer_graphic"
      /> */}
    </div>
    <div className={classes.icdcLogoContainer}>
      <div className={classes.grow} />
      {/* <img
        src={cancergraphic}
        alt="cancer_graphic"
      /> */}
    </div>
  </div>
);

const styles = () => ({
  grow: {
    flexGrow: 3,
  },
  headerBar: {
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
  },
  nihLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icdcLogoContainer: {
    display: 'flex',
    width: '100%',
    paddingLeft: '24px',
    background: 'none',
    '@media (min-width: 900px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${cancergraphic400})`,
    },
    '@media (min-width: 1200px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${cancergraphic800})`,
    },
    '@media (min-width: 1600px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${cancergraphic1400})`,
    },
    '@media (min-width: 2000px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${cancergraphic1600})`,
    },
    '@media (min-width: 2200px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${cancergraphic1800})`,
    },
    '@media (min-width: 2400px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${cancergraphic2000})`,
    },
  },
  nihLogoImg: {
    height: '54px',
    width: '463px',
    cursor: 'pointer',
    marginLeft: '9px',
  },
  icdcLogoImg: {
    margin: '22px 35px auto',
    height: '39px',
    cursor: 'pointer',
  },
});


Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
