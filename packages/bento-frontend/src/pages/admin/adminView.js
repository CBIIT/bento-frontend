import React from 'react';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {
  getColumns,
} from '@bento-core/util';
import {
  ManageAccessTableGenerator,
  PendingRequestsTableGenerator
} from '@bento-core/admin';
import MANAGE_ACCESS_TABLE_CONFIG from './manageAccessTableConfig';
import PENDING_REQUESTS_TABLE_CONFIG from './pendingRequestsTableConfig';
import Stats from '../../components/Stats/AllStatsController';
import {
  GET_LIST_REQUESTS,
  GET_LIST_USERS,
  icon,
  nodeField,
  nodeLevelAccess,
  nodeName,
  tabManageAccess,
  tabPendingRequest,
} from '../../bento/adminData';

const useMock = false;

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

  const usersList = useQuery(GET_LIST_USERS, {
    fetchPolicy: 'no-cache',
    context: {
      clientName: useMock ? 'mockService' : 'userService',
    },
    variables: {
      role: pageState.includeNonMember ? ['member', 'non-member', 'admin'] : ['member', 'admin'],
      accessStatus: ['approved'],
    },
  });

  const requestsList = useQuery(GET_LIST_REQUESTS, {
    fetchPolicy: 'no-cache',
    context: {
      clientName: useMock ? 'mockService' : 'userService',
    },
    variables: {
      accessStatus: ['pending'],
    },
  });

  const nodeLevelColumn = [{
    name: nodeField,
    label: nodeName,
    options: {
      customBodyRender: (value, tableMeta) => {
        const href = `/#/admin/view/${tableMeta.rowData[7]}`;
        return (
          <Link
            href={href}
            classes={{
              root: classes.link,
            }}
          >
            {' '}
            {value}
          </Link>
        );
      },
    },
  }];

  const actionColumn = [{
    name: 'userID',
    label: 'Action',
    options: {
      sort: false,
      customBodyRender: (value) => {
        const href = `/#/admin/edit/${value}`;
        return (
          <Button
            variant="contained"
            component={Link}
            href={href}
            classes={{
              root: classes.btn,
            }}
          >
            Edit
          </Button>
        );
      },
    },
  }];

  const manageAccessColumns = nodeLevelAccess
    ? getColumns(tabManageAccess.table, classes).concat(nodeLevelColumn).concat(actionColumn)
    : getColumns(tabManageAccess.table, classes).concat(actionColumn);

  const { ManageAccessTable } = ManageAccessTableGenerator(MANAGE_ACCESS_TABLE_CONFIG);
  const { PendingRequestsTable } = PendingRequestsTableGenerator(PENDING_REQUESTS_TABLE_CONFIG);

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
          <ManageAccessTable
            columns={manageAccessColumns}
            content={usersList}
            includeNonMember={pageState.includeNonMember}
            tableSpec={tabManageAccess.table}
          />
        </TabPanel>
        <TabPanel value={pageState.tabValue} index={1}>
          <PendingRequestsTable
            content={requestsList}
            tableSpec={tabPendingRequest.table}
          />
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
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#437BBE',
    color: '#fff',
    borderRadius: '10px',
    marginLeft: '-6px',
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
