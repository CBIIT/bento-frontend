/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable } from 'bento-components';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  table, tableTitle, icon, externalLinkIcon,
} from '../../bento/programData';
import manipultateLinks from '../../utils/helpers';
import Stats from '../../components/Stats/AllStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../dashboard/dashboardState';

const updatedData = manipultateLinks(table.data);

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

  const columns = updatedData.slice(0, 10).map((column) => ({
    name: column.field,
    label: column.label,
    options: {
      display: column.display ? column.display : true,
      filter: false,
      customBodyRender: (value, tableMeta) => (
        <div>
          {
          column.internalLink ? <Link className={classes.link} to={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`}>{value}</Link>
            : column.externalLink ? (
              <span className={classes.linkSpan}>
                <a href={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`} target="_blank" rel="noopener noreferrer" className={classes.link}>{value}</a>
                <img
                  src={externalLinkIcon.src}
                  alt={externalLinkIcon.alt}
                  className={classes.externalLinkIcon}
                />
              </span>
            )
              : column.field === 'num_subjects' ? <Link className={classes.link} to={(location) => ({ ...location, pathname: '/cases' })} onClick={() => redirectTo('TAILORx')}>{value}</Link>
                : `${value}`
}
        </div>
      ),
    },
  }));

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
    rowsPerPageOptions: [10, 25, 50, 100],
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <TableFooter>
        <TableRow>
          <TablePagination
            className={count >= 10 ? classes.root : classes.root2}
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
                src={icon.src}
                alt={icon.alt}
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography>
                    <span className={classes.headerMainTitle}>{tableTitle}</span>
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
  root2: {
    display: 'none',
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
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
  linkSpan: {
    display: '-webkit-box',
  },
});

export default withStyles(styles, { withTheme: true })(Programs);
