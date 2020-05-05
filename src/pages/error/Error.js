import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Paper, Typography, withStyles,
} from '@material-ui/core';
import LeftBg from '../../assets/error/leftBg.png';
import rightBg from '../../assets/error/rightBg.png';


const Error = ({ classes }) => (
  <div className={classes.container}>
    <Grid container className={classes.container2}>
      <Grid item xs={3} className={classes.leftBg}> </Grid>
      <Grid item xs={6}>
        <Paper classes={{ root: classes.paperRoot }}>
          <div className={classes.errorCodeText}>404</div>
          <Typography className={classes.boldText}>PAGE NOT FOUND</Typography>
          <div className={classes.errorTextRow}>
            <Typography className={classes.errorText}>
The page you are looking for does not exist or another error has occured. Go back or head&nbsp;
              <Link className={classes.link} to="/">home</Link>
              {' '}
to choose another direction.
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={3} className={classes.rightBg} />
    </Grid>
  </div>
);

const styles = (theme) => ({
  container: {
    display: 'flex',
    marginTop: '-49px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#e7edf4',
    top: 0,
    left: 0,
    borderTop: '4px solid #417d96',
  },
  errorCodeText: {
    letterSpacing: 4,
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 140,
    fontWeight: 500,
    textAlign: 'center',
    textShadow: '5px 3px rgba(0,0,0,0.11)',
  },
  divider: {
    height: '1px',
    width: '800px',
  },
  paperRoot: {
    boxShadow: 'none',
    background: '#e7edf4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 12,
    paddingBottom: theme.spacing.unit * 16,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
  },
  boldText: {
    color: '#204C5B',
    fontFamily: 'Raleway',
    fontSize: 19,
    fontWeight: 600,
    textAlign: 'center',
  },
  errorTextRow: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    alignItems: 'center',
  },
  errorText: {
    color: '#417D96',
    fontFamily: 'Lato',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    color: '#39C0F0',
    textDecoration: 'underline',
  },
  leftBg: {
    backgroundRepeat: 'no-repeat',
    background: `url(${LeftBg})`,
    backgroundPosition: 'right',
  },
  rightBg: {
    backgroundRepeat: 'no-repeat',
    background: `url(${rightBg})`,
    backgroundPosition: 'left',

  },
  container2: {
    maxWidth: '1200px',
  },
});

export default withStyles(styles, { withTheme: true })(Error);
