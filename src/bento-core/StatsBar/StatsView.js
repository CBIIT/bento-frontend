import React from 'react';
import { withStyles } from '@material-ui/core';

const StatsBarIcon = ({
  alt, classes, src,
}) => (
  <div className={classes.statsIcon}>
    <img src={src} alt={alt} />
  </div>
);

const StatsBarGroup = ({
  classes, data, index, stat, styles,
}) => {
  const countId = `statsbar_count_${index + 1}`;
  const isTitleFirst = styles.global.statTitleFirst;
  const titleId = `statsbar_title_${index + 1}`;
  return (
    <div className={classes.statsGroup}>
      <StatsBarIcon
        alt={stat.statIconAlt}
        classes={classes}
        src={stat.statIconSrc}
      />
      {
        isTitleFirst ? (
          <div>
            <div className={classes.statTitle} id={titleId}>
              {stat.statTitle}
            </div>
            <div className={classes.statCount} id={countId}>
              {data[stat.statAPI]}
            </div>
          </div>
        )
          : (
            <div>
              <div className={classes.statCount} id={countId}>
                {data[stat.statAPI]}
              </div>
              <div className={classes.statTitle} id={titleId}>
                {stat.statTitle ? stat.statTitle : 0}
              </div>
            </div>
          )
      }
    </div>
  );
};

const StatsBar = ({
  classes, data, stats, styles,
}) => (
  <>
    <div className={classes.statsSection}>
      <div
        className={classes.box}
      >
        {stats.slice(0, 7).map((stat, index) => (
          <StatsBarGroup
            classes={classes}
            data={data}
            index={index}
            stat={stat}
            styles={styles}
          />
        ))}
      </div>
    </div>
  </>
);

const styles = () => ({
  statsSection: (props) => ({
    top: props.styles.global.top ? props.styles.global.top : '139px',
    width: '100%',
    zIndex: 999,
    position: 'fixed',
    background: props.styles.global.background ? props.styles.global.background : '#8DCAFF',
    textAlign: 'center',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  box: (props) => ({
    display: 'inline-flex',
    height: props.styles.global.height ? props.styles.global.height : '47px',
    margin: '0 auto',
  }),
  statTitle: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    float: props.styles.statTitle ? props.styles.statTitle.float ? props.styles.statTitle.float : 'left' : 'left',
    color: props.styles.statTitle ? props.styles.statTitle.color ? props.styles.statTitle.color : '#062D4F' : '#062D4F',
    fontFamily: props.styles.statTitle ? props.styles.statTitle.fontFamily ? props.styles.statTitle.fontFamily : 'Nunito' : 'Nunito',
    fontWeight: 600,
    fontSize: props.styles.statTitle ? props.styles.statTitle.fontSize ? props.styles.statTitle.fontSize : '11px' : '11px',
    letterSpacing: '1px',
    margin: '14px 8px 0px 0px',
    textTransform: props.styles.statTitle ? props.styles.statTitle.textTransform ? props.styles.statTitle.textTransform : 'uppercase' : 'uppercase',
  } : {
    float: props.styles.statTitle ? props.styles.statTitle.float ? props.styles.statTitle.float : 'left' : 'left',
    color: props.styles.statTitle ? props.styles.statTitle.color ? props.styles.statTitle.color : '#263960' : '#263960',
    fontFamily: props.styles.statTitle ? props.styles.statTitle.fontFamily ? props.styles.statTitle.fontFamily : 'Nunito' : 'Nunito',
    fontSize: props.styles.statTitle ? props.styles.statTitle.fontSize ? props.styles.statTitle.fontSize : '11px' : '11px',
    fontWeight: props.styles.statTitle
      ? props.styles.statTitle.fontWeight ? props.styles.statTitle.fontWeight : 500 : 500,
    margin: props.styles.statTitle ? props.styles.statTitle.margin ? props.styles.statTitle.margin : '6px 0px 0px 15px' : '6px 0px 0px 15px',
    textTransform: props.styles.statTitle ? props.styles.statTitle.textTransform ? props.styles.statTitle.textTransform : 'uppercase' : 'uppercase',
    width: props.styles.statTitle ? props.styles.statTitle.width ? props.styles.statTitle.width : '90px' : '90px',
    textAlign: 'left',
  }),
  statCount: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    display: 'inline-block',
    float: props.styles.statCount ? props.styles.statCount.float ? props.styles.statCount.float : 'left' : 'left',
    color: props.styles.statCount ? props.styles.statCount.color ? props.styles.statCount.color : '#0467BD' : '#0467BD',
    fontFamily: props.styles.statCount ? props.styles.statCount.fontFamily ? props.styles.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.styles.statCount ? props.styles.statCount.fontSize ? props.styles.statCount.fontSize : '20px' : '20px',
    margin: props.styles.statCount ? props.styles.statCount.margin ? props.styles.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    fontWeight: 600,
  } : {
    width: props.styles.statCount ? props.styles.statCount.width ? props.styles.statCount.width : '100%' : '100%',
    textAlign: props.styles.statCount ? props.styles.statCount.textAlign ? props.styles.statCount.textAlign : 'left' : 'left',
    color: props.styles.statCount ? props.styles.statCount.color ? props.styles.statCount.color : '#263960' : '#263960',
    fontFamily: props.styles.statCount ? props.styles.statCount.fontFamily ? props.styles.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.styles.statCount ? props.styles.statCount.fontSize ? props.styles.statCount.fontSize : '20px' : '20px',
    margin: props.styles.statCount ? props.styles.statCount.margin ? props.styles.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    float: props.styles.statCount ? props.styles.statCount.float ? props.styles.statCount.float : 'none' : 'none',
    fontWeight: 600,
  }),
  statsGroup: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    // spacing between stats
    margin: props.styles.statsGroup ? props.styles.statsGroup.margin ? props.styles.statsGroup.margin : '4px 32px' : '4px 32px',
  } : {
    margin: props.styles.statsGroup ? props.styles.statsGroup.margin ? props.styles.statsGroup.margin : '4px 0px' : '4px 0px',
    padding: props.styles.statsGroup ? props.styles.statsGroup.padding ? props.styles.statsGroup.padding : '4px 40px 10px 60px' : '4px 40px 10px 60px',
    borderRight: props.styles.statsGroup ? props.styles.statsGroup.borderRight ? props.styles.statsGroup.borderRight : '4px solid #0B3556' : '4px solid #0B3556',
    minWidth: '180px',
    maxWidth: '185px',
    '&:first-child': {
      minWidth: '190px',
      maxWidth: '225px',
      padding: '6px 20px 10px 90px',
    },
    '&:last-child': {
      borderRight: 'none',
      minWidth: '205px',
      maxWidth: '225px',
      padding: '4px 40px 10px 80px',
    },
  }),
  statsIcon: (props) => ({
    position: 'absolute',
    float: 'left',
    width: props.styles.statsIcon ? props.styles.statsIcon.width ? props.styles.statsIcon.width : '28px' : '28px',
    height: props.styles.statsIcon ? props.styles.statsIcon.height ? props.styles.statsIcon.height : '28px' : '28px',
    margin: props.styles.statsIcon ? props.styles.statsIcon.margin ? props.styles.statsIcon.margin : '8px 0px 0px -35px' : '8px 0px 0px -35px',
  }),
});

StatsBar.defaultProps = {
  classes: {},
  styles: {},
};

// TODO: need to change it to injectStyle sheet
const StyledStatsBar = withStyles(styles)(StatsBar);
export default StyledStatsBar;
