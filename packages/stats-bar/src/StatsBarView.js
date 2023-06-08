import React from 'react';
import { withStyles } from '@material-ui/core';

const MAX_STATS_ALLOWED = 7; // Maximum number of stats allowed

/**
 * The StatsBar component is a horizontal bar that shows some quick stats
 *
 * @param {object} classes Classes
 * @param {object} stats Statistics to show
 * @param {object} styles Customized configurations used by both `styles` and withStyles(), below
 *
 * @returns {object} A React subcomponent
 */
const StatsBar = ({
  classes, stats, styles,
}) => {
  const countClasses = classes.statCount;
  const iconClasses = classes.statsIcon;
  const titleClasses = classes.statTitle;
  const truncatedListOfStats = stats.slice(0, MAX_STATS_ALLOWED);

  /**
   * An icon for a stat
   *
   * @param {string} alt The alt text
   * @param {string} src The image's source media
   *
   * @returns {object} A React subcomponent
   */
  const StatsBarIcon = ({
    alt, src,
  }) => (
    <div className={iconClasses}>
      <img src={src} alt={alt} />
    </div>
  );

  /**
   * The title and count for a single stat
   *
   * @param {number} countId DOM id for the count
   * @param {boolean} isTitleFirst Whether to show the title before the count
   * @param {string} title Name of the stat
   * @param {string} titleId DOM id for the title
   * @param {number} val The value to show
   *
   * @param {number} titleId DOM id for the title
   * @returns {object} A React subcomponent
   */
  const StatsBarTitleAndCount = ({
    countId,
    isTitleFirst,
    title,
    titleId,
    val,
  }) => {
    if (isTitleFirst) {
      return (
        <div>
          <div className={titleClasses} id={titleId}>
            {title}
          </div>
          <div className={countClasses} id={countId}>
            {val}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={countClasses} id={countId}>
          {val}
        </div>
        <div className={titleClasses} id={titleId}>
          {title || 0}
        </div>
      </div>
    );
  };

  /**
   * A group of things to show for a single stat
   *
   * @param {number} index Numbering assigned to this stats group
   * @param {object} stat Statistic to show
   *
   * @returns {object} A React subcomponent
   */
  const StatsBarGroup = ({
    index, stat,
  }) => {
    const countId = `statsbar_count_${index + 1}`;
    const isTitleFirst = styles.global.statTitleFirst;
    const titleId = `statsbar_title_${index + 1}`;

    return (
      <div className={classes.statsGroup}>
        <StatsBarIcon
          alt={stat.statIconAlt}
          src={stat.statIconSrc}
        />
        <StatsBarTitleAndCount
          countId={countId}
          isTitleFirst={isTitleFirst}
          title={stat.name}
          titleId={titleId}
          val={stat.val}
        />
      </div>
    );
  };

  return (
    <>
      <div className={classes.statsSection}>
        <div className={classes.box}>
          {truncatedListOfStats.map((stat, index) => (
            <StatsBarGroup
              index={index}
              stat={stat}
            />
          ))}
        </div>
      </div>
    </>
  );
};

/**
 * Used by withStyles(), below
 */
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
    ...props.styles.statTitle,
  } : {
    float: props.styles.statTitle ? props.styles.statTitle.float ? props.styles.statTitle.float : 'left' : 'left',
    color: props.styles.statTitle ? props.styles.statTitle.color ? props.styles.statTitle.color : '#263960' : '#263960',
    fontFamily: props.styles.statTitle ? props.styles.statTitle.fontFamily ? props.styles.statTitle.fontFamily : 'Nunito' : 'Nunito',
    fontSize: props.styles.statTitle ? props.styles.statTitle.fontSize ? props.styles.statTitle.fontSize : '11px' : '11px',
    fontWeight: props.styles.statTitle
      ? props.styles.statTitle.fontWeight ? props.styles.statTitle.fontWeight : 500 : 500,
    margin: props.styles.statTitle ? typeof props.styles.statTitle.margin !== 'undefined' ? props.styles.statTitle.margin : '6px 0px 0px 15px' : '6px 0px 0px 15px',
    textTransform: props.styles.statTitle ? props.styles.statTitle.textTransform ? props.styles.statTitle.textTransform : 'uppercase' : 'uppercase',
    width: props.styles.statTitle ? props.styles.statTitle.width ? props.styles.statTitle.width : '90px' : '90px',
    textAlign: 'left',
    ...props.styles.statTitle,
  }),
  statCount: (props) => ((props.styles.global && props.styles.global.horizontalStyle) ? {
    display: 'inline-block',
    float: props.styles.statCount ? props.styles.statCount.float ? props.styles.statCount.float : 'left' : 'left',
    color: props.styles.statCount ? props.styles.statCount.color ? props.styles.statCount.color : '#0467BD' : '#0467BD',
    fontFamily: props.styles.statCount ? props.styles.statCount.fontFamily ? props.styles.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.styles.statCount ? props.styles.statCount.fontSize ? props.styles.statCount.fontSize : '20px' : '20px',
    margin: props.styles.statCount ? props.styles.statCount.margin ? props.styles.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    fontWeight: 600,
    ...props.styles.statCount,
  } : {
    width: props.styles.statCount ? props.styles.statCount.width ? props.styles.statCount.width : '100%' : '100%',
    textAlign: props.styles.statCount ? props.styles.statCount.textAlign ? props.styles.statCount.textAlign : 'left' : 'left',
    color: props.styles.statCount ? props.styles.statCount.color ? props.styles.statCount.color : '#263960' : '#263960',
    fontFamily: props.styles.statCount ? props.styles.statCount.fontFamily ? props.styles.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.styles.statCount ? props.styles.statCount.fontSize ? props.styles.statCount.fontSize : '20px' : '20px',
    margin: props.styles.statCount ? props.styles.statCount.margin ? props.styles.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    float: props.styles.statCount ? props.styles.statCount.float ? props.styles.statCount.float : 'none' : 'none',
    fontWeight: 600,
    ...props.styles.statCount,
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
      padding: props.styles.statsGroup ? (props.styles.statsGroup['&:first-child'] && props.styles.statsGroup['&:first-child'].padding) ? props.styles.statsGroup['&:first-child'].padding : '6px 20px 10px 90px' : '6px 20px 10px 90px',
    },
    '&:last-child': {
      borderRight: 'none',
      minWidth: '205px',
      maxWidth: '225px',
      padding: props.styles.statsGroup ? (props.styles.statsGroup['&:last-child'] && props.styles.statsGroup['&:last-child'].padding) ? props.styles.statsGroup['&:last-child'].padding : '4px 40px 10px 80px' : '4px 40px 10px 80px',
    },
  }),
  statsIcon: (props) => ({
    position: 'absolute',
    float: 'left',
    width: props.styles.statsIcon ? props.styles.statsIcon.width ? props.styles.statsIcon.width : '28px' : '28px',
    height: props.styles.statsIcon ? props.styles.statsIcon.height ? props.styles.statsIcon.height : '28px' : '28px',
    margin: props.styles.statsIcon ? props.styles.statsIcon.margin ? props.styles.statsIcon.margin : '8px 0px 0px -35px' : '8px 0px 0px -35px',
    ...props.styles.statsIcon,
  }),
});

StatsBar.defaultProps = {
  classes: {},
  styles: {},
};

// TODO: need to change it to injectStyle sheet
const StyledStatsBar = withStyles(styles)(StatsBar);
export default StyledStatsBar;
