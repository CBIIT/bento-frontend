import React from 'react';
import {
  Grid, withStyles, Button, Switch, Collapse, FormControlLabel,
} from '@material-ui/core';
import { useTheme } from '../../components/ThemeContext';
import Stats from '../../components/Stats/DashboardStatsController';
import SideBar from '../../components/SideBar/SideBarView';
import ActiveFiltersQuery from '../../components/ActiveFiltersQuery/ActiveFiltersQuery';
import { widgetsData, displayActiveFiltersQuery } from '../../bento/dashboardData';
import Tab from './components/tabController';
import colors from '../../utils/colors';
import styles from './dashboardStyles';
import { Typography } from '../../components/Wrappers/Wrappers';
import { WidgetGenerator } from '../../bento-core/Widgets';

const Dashboard = ({
  classes, data, theme,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const themeChanger = useTheme();
  const handleChange = () => setCollapse((prev) => !prev);
  const widgetGeneratorConfig = {
    theme,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 20,
      },
    },
    SunburstConfig: {},
  };
  const { Widget } = WidgetGenerator(widgetGeneratorConfig);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Stats />
        <div>
          <div className={classes.content}>
            <div className={classes.sideBar}>
              <SideBar />
            </div>
            <div className={classes.rightContent}>
              <div className={classes.widgetsContainer}>
                {displayActiveFiltersQuery ? <ActiveFiltersQuery /> : ''}
                <div className={classes.widgetsCollapse}>
                  <div className={classes.floatLeft} />
                  <div className={classes.floatRight}>
                    <FormControlLabel
                      control={(
                        <Button className={classes.customButton} onClick={handleChange}>
                          {collapse ? 'COLLAPSE VIEW' : 'OPEN VIEW'}
                        </Button>
                      )}
                    />
                    <Switch
                      classes={{
                        root: classes.switchRoot,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                      }}
                      className={classes.customSwitch}
                      disableRipple
                      onChange={() => {
                        themeChanger.toggleTheme();
                      }}
                    />
                  </div>
                </div>
                <Collapse in={collapse} className={classes.backgroundWidgets}>
                  <Grid container>
                    {widgetsData.slice(0, 6).map((widget, index) => {
                      const dataset = data[widget.dataName];
                      if (!dataset) {
                        return <></>;
                      }
                      if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
                        return <></>;
                      }

                      return (
                        <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                          <Widget
                            header={(
                              <Typography
                                colorBrightness={theme.palette.lochmara.contrastText}
                                size="md"
                                weight="normal"
                                family="Nunito"
                                color={theme.palette.lochmara.contrastText}
                                className={classes.widgetTitle}
                              >
                                {widget.title}
                              </Typography>
                            )}
                            bodyClass={classes.fullHeightBody}
                            className={classes.card}
                            bottomDivider
                            customBackGround
                            data={dataset}
                            chartType={widget.type}
                            sliceTitle={widget.sliceTitle}
                            chartTitleLocation="bottom"
                            chartTitleAlignment="center"
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Collapse>
              </div>
              {collapse && <div className={classes.dashboardDividerTop} />}
              {collapse && <div className={classes.dashboardDivider} />}
              <Tab />
            </div>
          </div>
        </div>
        {/* Addingg diclaimer for Dev */}
        {/* <PositionedSnackbar /> */}
      </div>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Dashboard);
