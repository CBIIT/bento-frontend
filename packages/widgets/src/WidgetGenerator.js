import React from 'react';
import classnames from 'classnames';
import { makeStyles, Paper } from '@material-ui/core';
import { DEFAULT_CONFIG_DONUT, DonutChartGenerator } from './DonutChart/DonutChartGenerator';
import { DEFAULT_CONFIG_SUNBURST, SunburstChartGenerator } from './SunburstChart/SunburstChartGenerator';

const DEFAULT_CLASSES = makeStyles({
  widgetWrapper: {
    display: 'flex',
    minHeight: '100%',
  },
  widgetHeader: { },
  widgetDivider: {
    background: (theme) => (theme && theme.custom ? theme.custom.widgetDivider : 'transparent'),
    height: '6px',
    width: '180px',
    border: 'none',
    margin: '16px auto 0px auto',
  },
  paddedTitle: {
    margin: '32px 32px 0px 64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noPaddedTitle: {
    margin: '0px 0px 0px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  widgetRoot: { },
  widgetBody: {
    margin: '0px auto',
    paddingRight: (theme) => (theme && theme.spacing ? theme.spacing.unit * 3 : 0),
    paddingLeft: (theme) => (theme && theme.spacing ? theme.spacing.unit * 3 : 0),
  },
  noPadding: {
    padding: 0,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
    boxShadow: 'none',
  },
  customBackGround: {
    background: (theme) => (theme && theme.palette ? theme.palette.widgetBackground.main : 'transparent'),
  },
});

export const DEFAULT_CONFIG_WIDGET = {
  theme: null,
  classes: null,
  SunburstConfig: null,
  DonutConfig: null,
};

/**
 * Exposes a function that generates a widget component based on the provided configuration
 *
 * @param {object|null} uiConfig
 * @returns {object}
 */
export function WidgetGenerator(uiConfig = DEFAULT_CONFIG_WIDGET) {
  const {
    theme, classes: uiClasses,
    SunburstConfig: sbConfig, DonutConfig: dConfig,
  } = uiConfig;

  const SunburstConfig = sbConfig && typeof sbConfig === 'object' ? sbConfig : DEFAULT_CONFIG_SUNBURST;
  const { SunburstChart } = SunburstChartGenerator(SunburstConfig);

  const DonutConfig = dConfig && typeof dConfig === 'object' ? dConfig : DEFAULT_CONFIG_DONUT;
  const { DonutChart } = DonutChartGenerator(DonutConfig);

  const classes = uiClasses && typeof uiClasses === 'object'
    ? uiClasses
    : DEFAULT_CLASSES(theme);

  return {
    Widget: (props) => {
      const {
        // Widget Options
        title, header, noBodyPadding, bodyClass,
        customBackGround, bottomDivider, noPaddedTitle,
        // Chart Options
        chartType, sliceTitle, data, chartTitleLocation, chartTitleAlignment,
        children,
      } = props;

      return (
        <div className={classes.widgetWrapper}>
          <Paper
            className={classnames(classes.paper, {
              [classes.customBackGround]: customBackGround,
            })}
            classes={{ root: classes.widgetRoot }}
          >
            <div
              id={title}
              className={classnames(classes.widgetHeader, classes.paddedTitle, {
                [classes.noPaddedTitle]: noPaddedTitle,
              })}
            >
              {header || title}
            </div>
            <div
              className={classnames(classes.widgetBody, {
                [classes.noPadding]: noBodyPadding,
                [bodyClass]: bodyClass,
              })}
            >
              {chartType === 'donut' && (
                <DonutChart
                  data={data}
                  sliceTitle={sliceTitle || 'Cases'}
                  width={185}
                  height={210}
                  innerRadius={45}
                  outerRadius={80}
                  cx={90}
                  cy={98}
                  titleLocation={chartTitleLocation || 'bottom'}
                  titleAlignment={chartTitleAlignment || 'center'}
                />
              )}
              {chartType === 'sunburst' && (
                <SunburstChart
                  data={data}
                  sliceTitle={sliceTitle || 'Cases'}
                  width={250}
                  height={173}
                  padAngle={0}
                  titleLocation={chartTitleLocation || 'bottom'}
                  titleAlignment={chartTitleAlignment || 'center'}
                />
              )}
              {!chartType && children}
            </div>
            {bottomDivider && <hr className={classes.widgetDivider} />}
          </Paper>
        </div>
      );
    },
  };
}

export default WidgetGenerator;
