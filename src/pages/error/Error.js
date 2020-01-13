import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Paper, Typography, withStyles,
} from '@material-ui/core';
import caninHelix from '../../assets/error/canine_helix.jpg';

const Error = ({ classes }) => (
  <Grid container className={classes.container}>
    <Paper classes={{ root: classes.paperRoot }}>
      <Typography variant="h2" fontWeight="bold" color="white" className={classes.errorCodeText}>404 Page Not Found</Typography>
      <hr className={classes.divider} />
      <img className={classes.dogHumanHelix} src={caninHelix} alt="caninHelix 404" />
      <div className={classes.errorTextRow}>
        <Typography variant="h6" color="white" className={classes.errorText}>
The resource you are looking for is not at this URL. Please navigate to the ICDC&nbsp;
          <Link to="/">Dashboard</Link>
          {' '}
to access content.
        </Typography>
      </div>
    </Paper>
  </Grid>
);

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
  },
  divider: {
    height: '1px',
    width: '800px',
  },
  paperRoot: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 12,
    paddingBottom: theme.spacing.unit * 16,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    maxWidth: 800,
  },
  errorTextRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
  },
  dogHumanHelix: {
    width: 400,
  },
});

export default withStyles(styles, { withTheme: true })(Error);
