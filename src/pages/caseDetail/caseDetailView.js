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
import StatsView from '../../components/Stats/pageSpecificStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Cases.Icon.svg';
import formatBytes from '../../utils/formatBytes';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  caseHeader,
  leftPanelSubsections,
  rightPanelSubsections,
  tableConfig,
} from '../../bento/caseDetailData';
import { fetchDataForDashboardDataTable } from '../dashboard/dashboardState';

const options = (classes) => ({
  selectableRows: 'none',
  responsive: 'stacked',
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  sortOrder: {
    name: tableConfig.defaultSortField,
    direction: tableConfig.defaultSortDirection,
  },
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <TableFooter>
      <TableRow>
        <TablePagination
          className={count >= 11 ? classes.root : classes.noDisplay}
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

// Main case detail component
const CaseDetail = ({ data, classes }) => {
  const dispatch = useDispatch();

  // make sure dashboard data has been loaded first for stats bar to work
  React.useEffect(() => {
    dispatch(fetchDataForDashboardDataTable());
  }, []);

  const filter = [{
    groupName: caseHeader.label,
    name: data[caseHeader.dataField],
    datafield: caseHeader.dataField,
    isChecked: true,
  }];

  const breadCrumbJson = [{
    name: 'ALL CASES /',
    to: '/cases',
    isALink: true,
  }];

  const columns = tableConfig.columns.map((column, index) => (
    {
      name: column.dataField,
      label: column.header,
      options: {
        customBodyRender: (value) => (
          <div className={classes[`tableCell${index + 1}`]}>
            {' '}
            {column.formatBytes ? formatBytes(value) : value}
            {' '}
          </div>
        ),
      },
    }
  ));

  return (
    <>
      <StatsView filter={filter} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              className={classes.caseIcon}
              src={icon}
              alt="Bento case detail header logo"
            />

          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              {`${caseHeader.label} :`}
              { data[caseHeader.dataField]
                ? (
                  <span className={classes.headerMainTitleTwo}>
                    {' '}
                    {data[caseHeader.dataField]}
                  </span>
                )
                : (
                  <Typography variant="h5" color="error" size="sm">
                    {`"${caseHeader.dataField}" is not a valid property name`}
                  </Typography>
                )}
            </div>
            <div className={classes.breadCrumb}>
              {' '}
              <CustomBreadcrumb data={breadCrumbJson} />
            </div>
          </div>
        </div>

        <Grid container spacing={1} className={classes.detailContainer}>
          {/* Left panel */}
          <Grid item sm={6} xs={12} className={classes.detailPanel}>
            <div className={classes.innerPanel}>
              <Grid container spacing={2}>
                {leftPanelSubsections.map((section) => (
                  <Subsection
                    key={section.sectionHeader}
                    config={section}
                    data={data}
                  />
                ))}
              </Grid>
            </div>
          </Grid>
          {/* Left panel end */}
          {/* Right panel */}
          <Grid item sm={6} xs={12} className={classes.detailPanel}>
            <div className={classes.innerPanel}>
              <Grid container spacing={2}>
                {rightPanelSubsections.map((section) => (
                  <Subsection
                    key={section.sectionHeader}
                    config={section}
                    data={data}
                  />
                ))}
              </Grid>
            </div>
          </Grid>
          {/* Right panel end */}
        </Grid>
      </div>
      {
      tableConfig.display
        ? (
          <div id="table_case_detail" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <div className={classes.tableTitle}>
                <span className={classes.tableHeader}>{tableConfig.title}</span>
              </div>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <CustomDataTable
                      data={data[tableConfig.filesField]}
                      columns={columns}
                      options={options(classes)}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''
      }
    </>
  );
};

const styles = (theme) => ({
  container: {
    padding: '38px 117px 0 117px',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  root: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  noDisplay: {
    display: 'none',
  },
  header: {
    paddingRight: '32px',
    borderBottom: '#42779A 10px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto auto 10px auto',
  },
  caseIcon: {
    height: '94px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    paddingLeft: '98px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    color: '#274FA5',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',
    paddingTop: '20px',
  },
  headerMainTitleTwo: {
    fontWeight: 'bold',
    letterSpacing: '0.025em',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-6px',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.2))',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    padding: '26px 10px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailPanel: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    borderRight: '1px solid #81A6BA',
  },
  innerPanel: {
    height: '100%',
    minHeight: '209px',
    maxHeight: '380px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '16px',
    scrollbarColor: '#697270',
  },
  tableContainer: {
    padding: '0 117px',
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '32px',
  },
  tableDiv: {
    maxWidth: theme.custom.maxContentWidth,
    margin: '0 auto auto auto',
    paddingTop: '50px',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '22px',
    letterSpacing: '0.025em',
    color: '#3695A9',
    paddingBottom: '19px',
  },
  breadCrumb: {
    paddingTop: '3px',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
