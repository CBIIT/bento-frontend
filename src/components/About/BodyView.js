import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

const AboutBody = ({ classes, data }) => (
  <div className={classes.container}>
    <Grid container spacing={16} direction="row" className={classes.aboutSection}>
      <Grid item lg={3} md={3} sm={12} xs={12} className={classes.leftSection}>
        <img className={classes.img} src={data.img} alt="about" />
      </Grid>
      <Grid item lg={9} md={9} sm={12} xs={12} className={classes.rightSection}>
        <span className={classes.text}>
          {data.body}
        </span>
      </Grid>
    </Grid>
  </div>
);

const styles = () => ({
  container: {
    margin: '16px auto 16px auto',
    color: '#000000',
    fontFamily: '"Open Sans"',
    fontSize: '15px',
    lineHeight: '22px',
    maxWidth: '1440px',
  },
  text: {
    height: '476px',
    width: '675px',
    color: '#000000',
    fontFamily: '"Open Sans"',
    fontSize: '15px',
    lineHeight: '22px',
  },
  link: {
    color: '#0296C9',
    '&:hover': {
      color: '#0296C9',
    },
  },
  title: {
    color: '#0B3556',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  rightSection: {
    padding: '8px 25px !important',
    float: 'left',
  },
  leftSection: {
    float: 'left',
  },
  aboutSection: {
    margin: '60px auto 60px auto',
  },
  img: {
    width: '100%',
  },
});


export default withStyles(styles)(AboutBody);
