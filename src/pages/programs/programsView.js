import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable, getOptions, getColumns } from 'bento-components';
import {
  table, programListingIcon, externalLinkIcon,
} from '../../bento/programData';
import Stats from '../../components/Stats/AllStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
} from '../dashboardTab/store/dashboardReducer';

const Programs = ({ classes, data }) => {
  const redirectTo = (program) => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'programs',
      groupName: 'Program',
      isChecked: true,
      name: program.rowData[0],
      section: 'Filter By Cases',
    }]);
  };

  return (
    <>
      <Stats />
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={programListingIcon.src}
                alt={programListingIcon.alt}
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography>
                    <span className={classes.headerMainTitle}>{table.title}</span>
                  </Typography>
                </span>
              </div>
            </div>
          </div>

          { table.display ? (
            <div id="table_programs" className={classes.tableDiv}>
              <Grid container>
                <Grid item xs={12}>
                  <CustomDataTable
                    data={data[table.dataField]}
                    columns={getColumns(table, classes, data, externalLinkIcon, '/cases', redirectTo)}
                    options={getOptions(table, classes)}
                  />
                </Grid>
              </Grid>
            </div>
          ) : ''}
        </div>

      </div>
    </>
  );
};

const styles = (theme) => ({

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
    background: '#eee',
    paddingLeft: '20px',
    paddingRight: '50px',
    borderBottom: '#42779A 10px solid',
    height: '128px',
    paddingTop: '35px',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274FA5',
    fontSize: '24pt',
    position: 'absolute',
    marginTop: '16px',
    lineHeight: '25px',
    marginLeft: '-3px',
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
  tableContainer: {
    background: '#eee',
    paddingBottom: '50px',
  },
  tableDiv: {
    margin: 'auto',
  },
  tableCell6: {
    width: '120px',
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
  linkSpan: {
    display: '-webkit-box',
  },
});

export default withStyles(styles, { withTheme: true })(Programs);
