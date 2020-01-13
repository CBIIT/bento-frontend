import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch } from 'react-redux';
import Stats from '../../components/Stats/AllStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Icon-StudiesDetail.svg';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../dashboard/dashboardState';


const Studies = ({ classes, data }) => {
  const initDashboardStatus = () => (dispatch) => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const dispatch = useDispatch();
  const redirectTo = (study) => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Study',
        name: study,
        datafield: 'study_code',
        isChecked: true,
      }]));
    });
  };

  const columns = [
    {
      name: 'clinical_study_designation',
      label: 'Study Code',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="mui_td" style={{ width: '100px' }}>
            <Link className={classes.link} to={`/study/${value}`}>{value}</Link>
          </div>
        ),
      },
    },
    { name: 'program_id', label: 'Program' },
    { name: 'clinical_study_name', label: 'Study Name' },
    { name: 'clinical_study_type', label: 'Study Type' },
    {
      name: 'numberOfCases',
      label: 'Cases',
      options: {
        customBodyRender: (value, tableMeta) => (
          <div className="mui_td">
            {' '}
            <Link className={classes.link} to={(location) => ({ ...location, pathname: '/cases' })} onClick={() => redirectTo(tableMeta.rowData[0])}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
  ];

  const options = () => ({
    selectableRows: false,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    rowsPerPageOptions: [10, 25, 50, 100],
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <TableFooter>
        <TableRow>
          <TablePagination
            className={classes.root}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
              // eslint-disable-next-line no-shadow
            onChangePage={(_, page) => changePage(page)}
          />
        </TableRow>
      </TableFooter>
    ),
  });


  return (
    <>
      <Stats />
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={icon}
                alt="ICDC case detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography>
                    <span className={classes.headerMainTitle}>Studies</span>
                  </Typography>
                </span>
              </div>
            </div>
          </div>


          <div className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12}>
                <MUIDataTable
                  data={data.studiesByProgram}
                  columns={columns}
                  options={options(classes)}
                />
              </Grid>
            </Grid>
          </div>
        </div>


      </div>
    </>
  );
};

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#DC762F',
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
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
    background: '#eee',
    paddingLeft: '20px',
    paddingRight: '50px',
    borderBottom: '#004c73 10px solid',
    height: '120px',
    paddingTop: '35px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilyRaleway,
    fontWeight: '500',
    letterSpacing: '0.025em',
    color: '#0296c9',
    fontSize: '28px',
    position: 'absolute',
    marginTop: '14px',
    lineHeight: '25px',
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
    marginLeft: '-13px',
    width: '83px',
    zIndex: '999',
  },
  tableContainer: {
    background: '#eee',
    paddingBottom: '50px',
  },
  tableDiv: {
    margin: 'auto',
  },
});

export default withStyles(styles, { withTheme: true })(Studies);
