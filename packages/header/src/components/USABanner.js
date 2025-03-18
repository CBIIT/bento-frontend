import React from 'react';
import { withStyles } from '@material-ui/core';
import { headerData } from '../config/HeaderConfig';

const styles = () => ({
  bannerArea: {
    flexDirection: 'row',
    width: '100%',
    height: '46px',
    background: '#F0F0F0',
  },
  bannerContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1400px',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '2rem',
    '& img': {
      marginRight: '14px',
    },
    '& .text': {
      fontFamily: "'Open Sans', sans-serif",
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      width: 'fit-content',
      height: '16px',
    },
    '@media (max-width: 1023px)': {
      paddingLeft: '1rem',
    },
  },
});

const USABanner = ({ classes }) => (
  <div className={classes.bannerArea} data-testid="navigation-flag-banner">
    <div className={classes.bannerContainer}>
      <img src={headerData.usaFlagSmall} alt={headerData.usaFlagSmallAltText} />
      <div className="text">
        An official website of the United States government
      </div>
    </div>
  </div>
);

export default withStyles(styles)(USABanner);
