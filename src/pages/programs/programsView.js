import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable } from 'bento-components';
import { Link } from 'react-router-dom';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch } from 'react-redux';
import Stats from '../../components/Stats/AllStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/trial/Trials_Title_Bar.Icon.svg';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../dashboard/dashboardState';

const Programs = ({ classes, data }) => {
  const initDashboardStatus = () => (dispatch) => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const dispatch = useDispatch();
  const redirectTo = (trial) => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Program',
        name: trial,
        datafield: 'program',
        isChecked: true,
      }]));
    });
  };

  const columns = [
    {
      name: 'program_acronym',
      label: 'Program Code',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div className={classes.tableCell1}>
            <Link className={classes.link} to={`/program/${tableMeta.rowData[1]}`}>{value}</Link>
          </div>
        ),
      },
    },
    {
      name: 'program_id',
      label: 'Program ID',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell2}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'program_name',
      label: 'Program Name',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell3}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'start_date',
      label: 'Start Date',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell4}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'end_date',
      label: 'End Date',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell5}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'pubmed_id',
      label: 'PubMed ID',
      options: {
        customBodyRender: (value, tableMeta) => (
          <div className={classes.tableCell5}>
            {' '}
            <a href={`https://pubmed.ncbi.nlm.nih.gov/${tableMeta.rowData[5]}`} target="_blank" rel="noopener noreferrer" className={classes.link}>{value}</a>
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'num_studies',
      label: 'Number of Studies',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell5}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'num_subjects',
      label: 'Study Subjects',
      options: {
        customBodyRender: (value, tableMeta) => (
          <div className={classes.tableCell5}>
            {' '}
            <Link className={classes.link} to={(location) => ({ ...location, pathname: '/cases' })} onClick={() => redirectTo(tableMeta.rowData[0])}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
  ];

  const options = () => ({
    selectableRows: 'none',
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    rowsPerPageOptions: [10, 20, 25, 50, 100],
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
                alt="BENTO header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography>
                    <span className={classes.headerMainTitle}>Programs</span>
                  </Typography>
                </span>
              </div>
            </div>
          </div>

          <div id="table_programs" className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12}>
                <CustomDataTable
                  data={data.programInfo}
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
    color: '#DD401C',
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
    borderBottom: '#4B619A 10px solid',
    height: '120px',
    paddingTop: '35px',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#4B619A',
    fontSize: '24pt',
    position: 'absolute',
    marginTop: '14px',
    lineHeight: '25px',
    marginLeft: '-5px',
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
    width: '82px',
    zIndex: '999',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.2))',
  },
  tableContainer: {
    background: '#eee',
    paddingBottom: '50px',
  },
  tableDiv: {
    margin: 'auto',
  },
  tableCell1: {
    paddingLeft: '25px',
    width: '230px',
  },
  tableCell2: {
    width: '230px',
  },
  tableCell3: {
    width: '530px',
  },
  tableCell4: {
    width: '140px',
  },
  tableCell5: {
    width: '140px',
  },
});

export default withStyles(styles, { withTheme: true })(Programs);
