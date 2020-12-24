import React from 'react';
import { withStyles } from '@material-ui/core';

const tabLabel = ({
  classes, title, count, primaryColor,
}) => (
  <div className={classes.defaultStyle}>
    <span style={{ color: primaryColor }}>
      {title}
      {' '}

    </span>
    <span style={{ fontSize: '17px', color: primaryColor }}>
      (
      {count}
      )
    </span>

  </div>
);

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Lato',
    textTransform: 'capitalize',
    fontSize: '21px',
  },
});

export default withStyles(styles, { withTheme: true })(tabLabel);
