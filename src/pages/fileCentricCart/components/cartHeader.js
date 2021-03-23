import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Styles from './cartHeader.style';

const CartHeader = ({
  classes,
  headerIconSrc,
  headerIconAlt,
  mainTitle,
  subTitle,
}) => (
  <div className={classes.header}>
    <div className={classes.logo}>
      <img
        src={headerIconSrc}
        alt={headerIconAlt}
      />

    </div>
    <div className={classes.headerTitle}>
      <div className={classes.headerMainTitle}>
        {mainTitle}
        <span className={classes.headerMainTitleTwo}>
          {' '}
          {' '}
          {subTitle}
        </span>
      </div>
    </div>
  </div>
);

export default withStyles(Styles, { withTheme: true })(CartHeader);
