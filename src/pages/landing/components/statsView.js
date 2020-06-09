import React from 'react';
import classnames from 'classnames';
import {
  withStyles,
} from '@material-ui/core';


const LandingStatsView = ({ classes, data }) => (
  <>
    <div className={classes.statsSection}>
      <div
        className={classnames({
          [classes.boxCut]: data.length < 5,
          [classes.box]: data.length === 5,
        })}
      >

        {
        data.map((stat) => (
          <div className={classes.statsGroup}>
            <div className={classes.statsText}>
              <div className={classes.statTitle}>
                {stat.statTitle}
              </div>
              <div className={classes.statCount}>
                {stat.statCount}
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
    background: 'transparent',
    maxWidth: '900px',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '-24px auto auto auto',
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
    borderBottom: '74px solid white',
    borderLeft: '50px solid transparent',
    height: '74px',
  },
  box: {
    direction: 'ltr',
    display: 'inline-flex',
    borderBottom: '74px solid white',
    height: '74px',
  },
  statsText: {
    height: '42px',
    borderBottom: '2px solid #27DBFF',
  },
  statTitle: {
    display: 'inline-block',
    float: 'left',
    color: '#476783',
    fontFamily: 'Nunito Sans',
    fontSize: '11px',
    fontWeight: 'bold',
    marginRight: '20px',
    marginTop: '16px',
  },
  statCount: {
    display: 'inline-block',
    color: '#244264',
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
    margin: '14px 48px',
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
