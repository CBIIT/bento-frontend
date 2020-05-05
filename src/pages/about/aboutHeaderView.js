import React from 'react';
import { withStyles } from '@material-ui/core';

const AboutHeader = ({ classes, title }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <div className={classes.slope} />
      <div id="about_title" className={classes.slope2}><span className={classes.slope2Text}>{title}</span></div>
    </div>
  </div>
);

const styles = () => ({
  header: {
    position: 'relative',
    margin: '20px auto',
  },
  slope2Text: {
    height: '65px',
    width: '252px',
    color: '#087CA5',
    fontFamily: 'Raleway',
    fontSize: '25px',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
    lineHeight: '65px',
  },
  slope: {
    background: '#087CA5',
    width: '18%',
    height: '65px',
    '&:after': {
      content: '""',
      position: 'absolute',
      left: '18%',
      borderTop: '65px solid #087CA5',
      borderRight: '65px solid transparent',
    },
  },
  slope2: {
    background: '#E5E7E8',
    width: 'calc(82% - 54px)',
    height: '65px',
    float: 'right',
    position: 'absolute',
    right: '0',
    top: '20px',
    '&:after': {
      content: '""',
      position: 'absolute',
      right: '100%',
      borderBottom: '65px solid #E5E7E8',
      borderLeft: '65px solid transparent',
    },
  },
});


export default withStyles(styles)(AboutHeader);
