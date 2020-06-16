/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import stats from '../../bento/stats.json';
import {
  withStyles,
} from '@material-ui/core';

const LandingStatsView = ({ classes, data }) => (
  <>
    <div className={classes.statsSection}>
      <div
        className={classnames({
          [classes.boxCut]: stats.length < 5,
          [classes.box]: stats.length === 5,
        })}
      >

        {
        stats.map((stat) => (
          <div className={classes.statsGroup}>
            <div className={classes.statsText}>
              <div className={classes.statTitle}>
                {stat.statTitle}
              </div>
              <div className={classes.statCount}>
                {data[stat.statAPI]}
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  </>
);

const styles = () => ({
  statsSection: {
    top: '139px',
    width: '100%',
    zIndex: 999,
    position: 'fixed',
    background: '#8DCAFF',
    textAlign: 'center',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bannerTexture: {
    color: '#4898B4',
    fontFamily: 'Raleway',
    fontSize: '19px',
    fontWeight: '600',
    lineHeight: '60px',
    textAlign: 'center',
    margin: '0 auto',
    letterSpacing: '0.050pt',
    textTransform: 'uppercase',
    width: '869px',
  },
  boxCut: {
    direction: 'ltr',
    display: 'inline-flex',
    borderBottom: '47px solid #8DCAFF',
    borderLeft: '50px solid transparent',
    height: '47px',
  },
  box: {
    direction: 'ltr',
    display: 'inline-flex',
    borderBottom: '47px solid #8DCAFF',
    height: '47px',
    margin: '0 auto',
  },
  statsText: {
    height: '42px',
  },
  statTitle: {
    display: 'inline-block',
    float: 'left',
    color: '#062D4F',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '11px',
    marginRight: '16px',
    marginTop: '16px',
    textTransform: 'uppercase',
  },
  statCount: {
    display: 'inline-block',
    color: '#0467BD',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 500,
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
  statsGroup: {
    // padding: '36px 48px 4px 48px',
    // borderBottom: '2px solid',
    margin: '4px 48px',
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
