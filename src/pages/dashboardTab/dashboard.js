import React from 'react';
import {
  Grid, withStyles, Button, Switch, Collapse, FormControlLabel,
} from '@material-ui/core';
import { ProgramSunburst, CustomActiveDonut } from 'bento-components';
import { useTheme } from '../../components/ThemeContext';
import Widget from '../../components/Widgets/WidgetView';
import Stats from '../../components/Stats/DashboardStatsController';
import SideBar from '../../components/SideBar/SideBarView';
import ActiveFiltersQuery from '../../components/ActiveFiltersQuery/ActiveFiltersQuery';
import { widgetsData, displayActiveFiltersQuery } from '../../bento/dashboardData';
import Tab from './components/tabController';
import colors from '../../utils/colors';
import styles from './dashboardStyles';

const displaywidgets = widgetsData.filter((widget) => widget.show === true).slice(0, 6);

const Dashboard = ({
  classes, data, theme,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const themeChanger = useTheme();
  const handleChange = () => setCollapse((prev) => !prev);

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
                    {displaywidgets.map((widget, index) => {
                      if (widget.type === 'sunburst' && (widget.show && data[widget.dataName] && data[widget.dataName].children && data[widget.dataName].children.length)) {
                        return (
                          <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                            <Widget
                              title={widget.label}
                              upperTitle
                              bodyClass={classes.fullHeightBody}
                              className={classes.card}
                              color={theme.palette.lochmara.contrastText}
                              widgetBorderDivider
                              customBackGround
                            >
                              <ProgramSunburst
                                data={data[widget.dataName]}
                                titleText={widget.titleText || 'Cases'}
                                width={250}
                                height={173}
                                innerRadius={40}
                                outerRadius={65}
                                cx="50%"
                                cy="50%"
                                textColor={theme.palette.widgetBackground.contrastText}
                                titleLocation="bottom"
                                titleAlignment="center"
                              />
                            </Widget>
                          </Grid>
                        );
                      }
                      if (widget.type === 'donut' && widget.show && data[widget.dataName].length !== 0) {
                        return (
                          <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                            <Widget
                              title={widget.label}
                              upperTitle
                              bodyClass={classes.fullHeightBody}
                              className={classes.card}
                              color={theme.palette.lochmara.contrastText}
                              widgetBorderDivider
                              customBackGround
                            >
                              <CustomActiveDonut
                                data={data[widget.dataName]}
                                titleText={widget.titleText || 'Cases'}
                                width={400}
                                height={225}
                                innerRadius={50}
                                outerRadius={75}
                                cx="50%"
                                cy="50%"
                                textColor={theme.palette.widgetBackground.contrastText}
                                colors={colors}
                                titleLocation="bottom"
                                titleAlignment="center"
                                paddingSpace={2}
                              />
                            </Widget>
                          </Grid>
                        );
                      }
                      return <></>;
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
