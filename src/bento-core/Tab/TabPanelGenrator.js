import React from 'react';
import { withStyles } from '@material-ui/core';

const TabPanel = ({
  children,
  value,
  index,
  classes,
}) => (
  <div
    className={classes.content}
    role="tabpanel"
    hidden={value !== index}
  >
    {children}
  </div>
);

const styles = () => ({
  content: {
    height: '100%',
  },
});

export default withStyles(styles)(TabPanel);
