import React from 'react';
import {
  Grid, withStyles, Button, Switch, Collapse, FormControlLabel,
} from '@material-ui/core';
import { ProgramSunburst, CustomActiveDonut } from 'bento-components';
import { useTheme } from '../../components/ThemeContext';
import Widget from '../../components/Widgets/WidgetView';
import Stats from '../../components/Stats/DashboardStatsController';
import Cases from './caseTable/caseController';
// import PositionedSnackbar from '../../components/Disclaimer/DisclaimerView';
import SideBar from '../../components/SideBar/SideBarView';
import { widgetsData } from '../../bento/dashboardData';
import colors from '../../utils/colors';

const displaywidgets = widgetsData.filter((widget) => widget.show === true).slice(0, 6);

const Dashboard = ({
  classes, data, theme,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const themeChanger = useTheme();
  const handleChange = () => {
    setCollapse((prev) => !prev);
  };

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
                <div className={classes.widgetsCollapse}>
                  <div className={classes.floatLeft} />
                  <div className={classes.floatRight}>
                    <FormControlLabel
                      control={(
                        <Button className={classes.customButton} onClick={handleChange}>
                          {collapse ? 'COLLAPSE VIEW' : 'OPEN VIEW' }
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
                      if (widget.type === 'sunburst' && widget.show) {
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
                      if (widget.type === 'donut' && widget.show) {
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
              { collapse && <div className={classes.dashboardDividerTop} />}
              { collapse && <div className={classes.dashboardDivider} />}
              <Cases />
            </div>
          </div>
        </div>
        {/* Addingg diclaimer for Dev */}
        {/* <PositionedSnackbar /> */}
      </div>
    </>
  );
};

const styles = (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
    // boxShadow: 'inset 0 0 87px 7px rgba(27,28,28,0.15)',
  },
  dashboardDivider: {
    height: 16,
    backgroundColor: '#E2E7EC',
  },
  dashboardDividerTop: {
    height: 16,
    backgroundColor: theme.palette.widgetBackground.main,
  },
  rightContent: {
    maxWidth: 'calc(100% - 250px)',
  },
  content: {
    // padding: theme.spacing.unit * 3,
    display: 'flex',
    maxWidth: '1800px',
    margin: 'auto',
  },
  widgetsContainer: {
    background: theme.palette.widgetBackground.main,
  },
  contentShift: {
    width: `calc(100vw - ${theme.custom.drawerWidth})`,
    marginLeft: theme.custom.drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  sunburst: {
    textAlign: 'center',
  },
  widgetInner: {
    marginTop: '-8px',
    borderBottom: '6px solid #E2E7EC',
  },
  widgetsCollapse: {
    background: theme.palette.widgetBackground.main,
  },
  floatRight: {
    float: 'right',
    marginRight: '80px',
  },
  floatLeft: {
    float: 'left',
  },
  customSwitch: {
    marginTop: '-6px',
  },
  customButton: {
    borderRadius: '0 0 18px 18px',
    minHeight: '20px',
    fontSize: 8,
    color: '#ffffff',
    textTransform: 'none',
    backgroundColor: '#566672',
    marginRight: '4px',
    fontFamily: theme.custom.fontFamilySans,
    marginTop: '-4px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  backgroundWidgets: {
    background: theme.palette.widgetBackground.main,
  },
  sideBar: {
    width: '250px',
    backgroundColor: '#FFFFFF',
    boxShadow: 'inset 0 0 87px 7px #E2E7EC',
    // background: 'linear-gradient(to left, #E2E7EC, #FBFBFB ,)',
  },
  statsBar: {
    position: 'fixed',
  },
  switchBase: {
    color: theme.palette.widgetBackground.contrastText,
    '&$checked': {
      color: theme.palette.widgetBackground.contrastSwicthColor,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.widgetBackground.contrastText,
    },
  },
  checked: {},
  track: {},
});

export default withStyles(styles, { withTheme: true })(Dashboard);
