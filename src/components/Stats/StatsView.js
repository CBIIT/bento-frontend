/* eslint-disable */
import React from 'react';
import {
  Grid,
  Paper,
  withStyles,
} from '@material-ui/core';
import { Typography } from '../Wrappers/Wrappers';
import TrialsIcon from '../../assets/icons/stats/stats-bar-trials.svg';
import CasesIcon from '../../assets/icons/stats/stats-bar-cases.svg';
import FilesIcon from '../../assets/icons/stats/stats-bar-files.svg';


const StatsView = ({ classes, data }) => (
  <Grid container className={classes.statsContainer}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div id="stats_bar" container className={classes.statsMaxWidth}>
          <div className={classes.statsGroup}>
            <div className={classes.statsIcon}>
              <img
                src={TrialsIcon}
                alt="Studies Stats Bar Icon"
              />

            </div>
            <div className={classes.statsText}>
              <div className={classes.floatLeft}>
                <Typography weight="bold" size="sm"  color="textWithBackground">
                      TRIALS:
                  {' '}
                  {' '}
                </Typography>
              </div>
              <div id="trials_count" className={classes.floatRight}>
                <Typography color="primary" weight="bold" size="sm">
                  {data.numberOfTrials ? data.numberOfTrials : 0}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.statsGroup}>
            <div className={classes.statsIcon}>
              <img
                src={CasesIcon}
                alt="Cases Stats Bar Icon"
              />

            </div>
            <div className={classes.statsText}>
              <div className={classes.floatLeft}>
                <Typography weight="bold" size="sm" color="textWithBackground">
                      CASES:
                  {' '}
                  {' '}
                </Typography>
              </div>
              <div id="cases_count" className={classes.floatRight}>
                <Typography color="primary" weight="bold" size="sm">
                  {data.numberOfCases ? data.numberOfCases : 0}
                </Typography>
              </div>

            </div>
          </div>
          <div className={classes.statsGroup}>
            <div className={classes.statsIcon}>
              <img
                src={FilesIcon}
                alt="Files Stats Bar Icon"
              />

            </div>
            <div className={classes.statsText}>
              <div className={classes.floatLeft}>
                <Typography weight="bold" size="sm" color="textWithBackground">
                      FILES:
                  {' '}
                  {' '}
                </Typography>
              </div>
              <div id="files_count" className={classes.floatRight}>
                <Typography weight="bold" color="primary" size="sm">
                  {data.numberOfFiles ? data.numberOfFiles : 0}
                </Typography>
              </div>

            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  </Grid>
);

const styles = (theme) => ({
  statsContainer: {
        position: 'fixed',
        width: '100%',
        zIndex: '999',
        top: '139px',
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    // textAlign: 'center',
    background: theme.palette.deepSkyBlue.main,
    boxShadow: 'none',
    borderRadius: '0',
  },
  statsGroup: {
    padding: '13px 48px 12px 48px',
    height: '46px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  statsText: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '32px',
    marginBottom: '8px',
  },
  statsIcon: {
    position: 'absolute',
    float: 'left',
    width: '28px',
    height: '28px',
    marginTop: '-4px',
  },
  floatLeft: {
    float: 'left',
    marginTop: '3px',
    letterSpacing: '1px',
  },
  floatRight: {
    float: 'right',
    marginLeft: '6px',
    marginTop: '3px',
  },
  statsMaxWidth: {
    display: 'flex',
    maxWidth: '700px',
    margin: '0 auto',
  },
});

export default withStyles(styles, { withTheme: true })(StatsView);
