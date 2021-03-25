import React from 'react';
import classnames from 'classnames';
import {
  withStyles,
} from '@material-ui/core';

const LandingStatsView = ({ classes, stats, statsData }) => (
  <>
    <div className={classnames({
      [classes.statsSection]: stats.length < 5,
      [classes.statsSectionCenter]: stats.length === 5,
    })}
    >
      { stats.length > 0 && (
      <div
        className={classnames({
          [classes.boxCut]: stats.length < 5,
          [classes.box]: stats.length === 5,
        })}
      >

        {
        stats.map((stat, index) => (
          <div className={classes.statsGroup}>
            <div className={classes.statsText}>
              <div className={classes.statTitle} id={`title_${index + 1}`}>
                {stat.statTitle}
              </div>
              <div className={classes.statCount} id={`count_${index + 1}`}>
                {statsData[stat.statAPI]}
              </div>
            </div>
          </div>
        ))
        }
      </div>
      ) }
    </div>
  </>
);

const styles = () => ({
  statsSection: {
    background: 'transparent',
    maxWidth: '906px',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '-24px auto auto auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statsSectionCenter: {
    background: 'transparent',
    maxWidth: '906px',
    textAlign: 'center',
    position: 'absolute',
    overflow: 'auto',
    left: 0,
    right: 0,
    margin: '-24px auto auto auto',
    display: 'flex',
    justifyContent: 'center',
    '@media (min-width: 900px)': {
      overflow: 'inherit',
    },
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
    boxShadow: '-3px 5px 24px 1px rgba(27,28,28,0.15)',
    // '@media (min-width: 900px)': {
    //   display: 'inline-flex',
    // },

  },
  statsText: {
    height: '42px',
    display: 'flex',
    borderBottom: '3px solid #27DBFF',
  },
  statTitle: {
    display: 'inline-block',
    float: 'left',
    color: '#476783',
    fontFamily: 'Nunito',
    letterSpacing: 1,
    fontWeight: 900,
    fontSize: '11px',
    marginRight: '16px',
    marginTop: '16px',
    textTransform: 'uppercase',
  },
  statCount: {
    display: 'inline-block',
    color: '#244264',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
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
