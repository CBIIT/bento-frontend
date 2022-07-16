/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {  withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stats from '../../components/Stats/AllStatsController';
import { icon } from '../../bento/adminData';
import TableManageAccess from './components/tableManageAccess.js';
import TablePendingRequest from './components/tablePendingRequest.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const adminView = ({ classes, data }) => {
  const [value, setValue] = React.useState(0);
  const [includeNonMember, setIncludeNonMember] = React.useState(true);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckBoxChange= (event) => {
    setIncludeNonMember(event.target.checked);
  };


  return (
    <div className={classes.pageContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
              <div className={classes.logo}>
                {<img
                  src={icon.src}
                  alt={icon.alt}
                />}

              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                    <Typography>
                      <span className={classes.headerMainTitle}>Admin Portal</span>
                    </Typography>
                </div>
              </div>
          </div>
       
        <Tabs classes={{
                indicator: classes.tabIndicator
              }} 
              value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="MANAGE ACCESS" {...a11yProps(0)} 
              classes={{
                root:classes.tab,
              }}/>
              <Tab label="PENDING REQUESTS" {...a11yProps(1)} 
               classes={{
                root:classes.tab,
              }}
              />
               <FormControlLabel
                control={
                  <Checkbox
                      classes={{
                      root:classes.checkbox,
                    }}
                    checked={includeNonMember}
                    onChange={handleCheckBoxChange}
                    name="Non-MembersCK"
                  />
                }
                label="Include Non-Members"
              />
            </Tabs>

          <TabPanel value={value} index={0}>
            <TableManageAccess includeNonMember={includeNonMember}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TablePendingRequest/>
          </TabPanel>
         </div>
    </div>
     
  );
}



const styles = (theme) => ({
  pageContainer: {
    background: '#fff',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#7747FF',
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
    paddingBottom: '50px',
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
  },
  tabIndicator: {
    backgroundColor: '#20C1AA',
    height:'4px',
  },
  checkbox: {
   color: '#20C1AA !important',
  },
 
});

export default withStyles(styles, { withTheme: true })(adminView);