import React from 'react';
import { withStyles } from '@material-ui/core';

const AboutHeader = ({ classes, title }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <div id="about_title" className={classes.titleBody}><span className={classes.titleText}>{title}</span></div>
    </div>
    <div className={classes.whitePadding} />
  </div>
);

const styles = () => ({
  header: {
    padding: '45px',
  },
  container: (props) => ({
    background: props.background,
  }),
  whitePadding: {
    height: '6px',
    background: 'white',
  },
  titleBody: {
    textAlign: 'center',
  },
  titleText: (props) => ({
    height: '65px',
    width: '252px',
    color: props.titleColor,
    fontFamily: 'Lato',
    fontSize: '35px',
    fontWeight: 'bold',
  }),
});

AboutHeader.defaultProps = {
  titleColor: '#0077E3',
  background: '#e7eef5',
};

export default withStyles(styles)(AboutHeader);
