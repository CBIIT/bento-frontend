import React from 'react';
import { withStyles, Icon } from '@material-ui/core';

const Logo = ({ imgSrc, imgAlt = 'Logo alt text', classes }) => (
  <Icon>
    <img src={imgSrc} className={classes.root} alt={imgAlt} />
  </Icon>
);

const styles = () => ({
  root: {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    flexShrink: 0,
    cursor: 'pointer',
  },
});

export default withStyles(styles)(Logo);
