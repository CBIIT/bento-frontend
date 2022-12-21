import React from 'react';
import { withStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stats from '../../components/Stats/AllStatsController';
import { icon, tabManageAccess, tabPendingRequest } from '../../bento/adminData';
import TableManageAccess from './components/tableManageAccess';
import TablePendingRequest from './components/tablePendingRequest';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Typography>{children}</Typography>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const adminView = ({ classes }) => {
  const [pageState, setPageState] = React.useState({ tabValue: 0, includeNonMember: false });

  const handleChange = (event, newValue) => {
    setPageState({ ...pageState, tabValue: newValue });
  };

  const handleCheckBoxChange = (event) => {
    setPageState({ ...pageState, includeNonMember: event.target.checked });
  };

  return (
    <div className={classes.pageContainer}>
      <Stats />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={icon.src}
              alt={icon.alt}
            />

          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              <Typography>
                <span className={classes.headerMainTitle}>Admin Portal</span>
              </Typography>
            </div>
          </div>
        </div>
        <div className={`${pageState.tabValue && pageState.tabValue === 1 ? classes.hide : classes.display}`}>
          <FormControlLabel
            classes={{
              label: classes.label,
            }}
            control={(
              <Checkbox
                classes={{
                  root: classes.checkbox,
                }}
                checked={pageState.includeNonMember}
                onChange={handleCheckBoxChange}
                name="Non-MembersCK"
              />
                )}
            label="Include Non-Members"
          />
        </div>
        <Tabs
          classes={{
            indicator: classes.tabIndicator,
          }}
          value={pageState.tabValue}
          onChange={handleChange}
          aria-label="tabs"
        >
          <Tab
            label={tabManageAccess.tabTitle}
            {...a11yProps(0)}
            classes={{
              root: classes.tab,
            }}
          />
          <Tab
            label={tabPendingRequest.tabTitle}
            {...a11yProps(1)}
            classes={{
              root: classes.tab,
            }}
          />

        </Tabs>

        <TabPanel value={pageState.tabValue} index={0}>
          <TableManageAccess includeNonMember={pageState.includeNonMember} />
        </TabPanel>
        <TabPanel value={pageState.tabValue} index={1}>
          <TablePendingRequest />
        </TabPanel>
      </div>
    </div>

  );
};

const styles = (theme) => ({
  pageContainer: {
    background: '#fff',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.text.link,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: 'auto',
    maxWidth: '1440px',
    paddingLeft: '36px',
    paddingRight: '36px',
    paddingBottom: '80px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Lato Regular","Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
    paddingLeft: '20px',
    paddingRight: '50px',
    borderBottom: '#AAB2C8 10px solid',
    height: '128px',
    paddingTop: '35px',
  },
  headerMainTitle: {

    fontFamily: 'Lato',
    letterSpacing: '0.005em',
    color: '#274FA5',
    fontSize: '24pt',
    position: 'absolute',
    marginTop: '16px',
    lineHeight: '25px',
    marginLeft: '-3px',
    width: '200px',
  },

  headerTitle: {
    maxWidth: '1440px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-17px',
    width: '100px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
  },

  tab: {
    color: '#465F96',
    fontSize: '14px',
    lineHeight: '22px',
    fontFamily: 'Nunito',
    paddingTop: '10px',
    fontWeight: 'bold',
  },
  tabIndicator: {
    backgroundColor: '#20C1AA',
    height: '4px',
  },
  checkbox: {
    color: '#20C1AA !important',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  hide: {
    display: 'none',
  },
  display: {
    display: 'block',
    float: 'right',
    marginRight: 'calc(100% - 549px)',
    marginTop: '3px',
  },
});

export default withStyles(styles, { withTheme: true })(adminView);
