import React from 'react';
import classnames from 'classnames';
import {
  Grid, withStyles, Button, Switch, Collapse, FormControlLabel,
} from '@material-ui/core';
import { useTheme } from '../../components/ThemeContext';
import Widget from '../../components/Widgets/WidgetView';
import Stats from '../../components/Stats/DashboardStatsController';
import Cases from './caseTable/caseController';
// import PositionedSnackbar from '../../components/Disclaimer/DisclaimerView';
import ProgramSunburst from '../../components/Widgets/PieCharts/ProgramSunburst/ProgramSunburstController';
import CustomActiveDonut from '../../components/Widgets/PieCharts/CustomActiveDonut/CustomActiveDonutController';


const Dashboard = ({
  classes, data, isSidebarOpened, theme,
}) => {
  const [checked, setChecked] = React.useState(true);
  const themeChanger = useTheme();
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <div className={classnames({
        [classes.contentShift]: isSidebarOpened,
      }, classes.content)}
      >
        <Stats />
        <div className={classes.widgetsContainer}>
          <div className={classes.widgetsCollapse}>
            <div className={classes.floatLeft} />
            <div className={classes.floatRight}>
              <FormControlLabel
                control={(
                  <Button className={classes.customButton} onClick={handleChange}>
                    {checked ? 'Close View' : 'Open View' }
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
                disableRipple
                onChange={() => {
                  themeChanger.toggleTheme();
                }}
              />
            </div>
          </div>
          <Collapse in={checked} className={classes.backgroundShawdowWidgets}>
            <Grid container spacing={8}>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  title="Programs and Studies"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="textWithBackground"
                  customBackGround
                >
                  <div className={classes.marginTop18}>
                    <ProgramSunburst
                      data={data.studiesByProgram}
                      width={250}
                      height={180}
                      innerRadius={40}
                      outerRadius={65}
                      cx="50%"
                      cy="50%"
                      textColor={theme.palette.widgetBackground.contrastText}
                    />
                  </div>
                </Widget>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  title="Breed"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="textWithBackground"
                  customBackGround
                >
                  <CustomActiveDonut
                    data={data.caseCountByBreed}
                    width={400}
                    height={225}
                    innerRadius={50}
                    outerRadius={75}
                    cx="50%"
                    cy="50%"
                    textColor={theme.palette.widgetBackground.contrastText}
                  />
                </Widget>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  title="Diagnosis"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="textWithBackground"
                  customBackGround
                >
                  <CustomActiveDonut
                    data={data.caseCountByDiagnosis}
                    width={400}
                    height={225}
                    innerRadius={50}
                    outerRadius={75}
                    cx="50%"
                    cy="50%"
                    textColor={theme.palette.widgetBackground.contrastText}
                  />
                </Widget>
              </Grid>
              {/* </Grid> */}
              {/* second row Grids */}
              {/* <Grid container spacing={32}> */}
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  title="Disease Site"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="textWithBackground"
                  customBackGround
                >
                  <CustomActiveDonut
                    data={data.caseCountByDiseaseSite}
                    width={400}
                    height={225}
                    innerRadius={50}
                    outerRadius={75}
                    cx="50%"
                    cy="50%"
                    textColor={theme.palette.widgetBackground.contrastText}
                  />
                </Widget>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  title="Gender"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="textWithBackground"
                  customBackGround
                >
                  <CustomActiveDonut
                    data={data.caseCountByGender}
                    width={400}
                    height={225}
                    innerRadius={50}
                    outerRadius={75}
                    cx="50%"
                    cy="50%"
                    textColor={theme.palette.widgetBackground.contrastText}
                  />
                </Widget>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  title="Stage of Disease"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="textWithBackground"
                  customBackGround
                >
                  <CustomActiveDonut
                    data={data.caseCountByStageOfDisease}
                    width={400}
                    height={225}
                    innerRadius={50}
                    outerRadius={75}
                    cx="50%"
                    cy="50%"
                    textColor={theme.palette.widgetBackground.contrastText}
                  />
                </Widget>
              </Grid>
            </Grid>
          </Collapse>
        </div>
        <Cases />
        {/* Addingg diclaimer for Dev */}
        {/* <PositionedSnackbar /> */}
      </div>
    </>
  );
};

const styles = (theme) => ({
  content: {
    // padding: theme.spacing.unit * 3,
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
  marginTop18: {
    marginTop: '18px',
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
  customButton: {
    borderRadius: '0 0 18px 18px',
    minHeight: '20px',
    fontSize: 8,
    color: '#ffffff',
    textTransform: 'none',
    backgroundColor: '#566672',
    marginRight: '4px',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  backgroundShawdowWidgets: {
    background: theme.palette.widgetBackground.lattice,
  },
  switchBase: {
    height: '20px',
    color: theme.palette.widgetBackground.contrastText,
    '&$checked': {
      color: theme.palette.widgetBackground.contrastText,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.widgetBackground.contrastText,
    },
  },
  checked: {},
  track: {},
});

export default withStyles(styles, { withTheme: true })(Dashboard);
