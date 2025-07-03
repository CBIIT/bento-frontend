import React, { useRef } from 'react';
import classnames from 'classnames';
import { makeStyles, Paper } from '@material-ui/core';
import FileSaver from 'file-saver';
import { DEFAULT_CONFIG_DONUT, DonutChartGenerator } from './DonutChart/DonutChartGenerator';
import { DEFAULT_CONFIG_SUNBURST, SunburstChartGenerator } from './SunburstChart/SunburstChartGenerator';
import { BarChartGenerator } from './BarChart/BarChartGenerator';
import exportIcon from './assets/Widget_Export.svg';

const DEFAULT_CLASSES = makeStyles({
  widgetWrapper: {
    display: 'flex',
    minHeight: '100%',
  },
  widgetHeader: {},
  widgetDividerWrapper: {
    margin: '0px 32px 0px 64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0px',
  },
  noPaddedTitle: {
    margin: '0px 0px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0px',
  },
  exportButton: {
    backgroundColor: 'white',
    padding: '0px',
    marginLeft: '12px',
    paddingTop: '3px',
    width: 'auto',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  widgetRoot: {
    borderRadius: '20px',
  },
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

  const { BarChart } = BarChartGenerator();

  const classes = uiClasses && typeof uiClasses === 'object'
    ? uiClasses
    : DEFAULT_CLASSES(theme);

  return {
    Widget: (props) => {
      const {
        // Widget Options
        title,
        header,
        noBodyPadding,
        bodyClass,
        customBackGround,
        bottomDivider,
        noPaddedTitle,
        // Chart Options
        chartType,
        sliceTitle,
        data,
        chartTitleLocation,
        chartTitleAlignment,
        children,
        width,
        height,
      } = props;
      const currentChart = useRef(null);

      const handleExportChart = () => {
        const chartSVG = currentChart.current.container.children[0];
        const chartWidth = chartSVG.clientWidth;
        const heightWidth = chartSVG.clientHeight;
        const svgURL = new XMLSerializer().serializeToString(chartSVG);
        const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);

        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = chartWidth;
          canvas.height = heightWidth;
          const context = canvas.getContext('2d');
          context.fillStyle = 'white';
          context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
          const png = canvas.toDataURL('image/png', 1.0);
          FileSaver.saveAs(png, `${title}.png`);
        };

        image.src = blobURL;
      };

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
              <span
                onClick={() => handleExportChart()}
                className={classes.exportButton}
              >
                <img
                  src={exportIcon}
                  style={{
                    width: 23,
                    height: 23,
                    margin: 0,
                  }}
                  alt="export"
                />
              </span>

            </div>
            <div
              className={classnames(classes.widgetBody, {
                [classes.noPadding]: noBodyPadding,
                [bodyClass]: bodyClass,
              })}
              style={chartType === 'bar' ? { width: '100%' } : {}}
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
                  currentChart={currentChart}
                />
              )}
              {chartType === 'bar' && (
                <BarChart
                  data={data}
                  width={width}
                  height={height}
                  currentChart={currentChart}
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
            {bottomDivider && chartType === 'bar' && (
              <div className={classes.widgetDividerWrapper}>
                <hr className={classes.widgetDivider} />
              </div>
            )}
            {bottomDivider && chartType !== 'bar' && (
              <hr className={classes.widgetDivider} />
            )}
          </Paper>
        </div>
      );
    },
  };
}

export default WidgetGenerator;
