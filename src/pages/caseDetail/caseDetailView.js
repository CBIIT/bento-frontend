import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch } from 'react-redux';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import FileGridView from '../../components/FileGridWithCart/FileGridView';
import icon from '../../assets/icons/Cases.Icon.svg';
import formatBytes from '../../utils/formatBytes';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import { FileOnRowsSelect, FileDisableRowSelection } from '../../utils/fileTable';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';
import {
  caseHeader,
  leftPanel,
  rightPanel,
  filesTable,
  samplesTable,
} from '../../bento/caseDetailData';
import { fetchDataForDashboardDataTable } from '../dashboard/dashboardState';
import { dateTimeStamp } from '../../utils/helpers';

const options = (classes, tableConfig) => ({
  selectableRows: true,
  responsive: 'stacked',
  search: false,
  filter: false,
  searchable: false,
  print: false,
  viewColumns: tableConfig.showHideColumns,
  pagination: true,
  sortOrder: {
    name: tableConfig.defaultSortField,
    direction: tableConfig.defaultSortDirection,
  },
  download: tableConfig.download,
  downloadOptions: {
    filename: tableConfig.downloadFileName.concat(dateTimeStamp()).concat('.csv'),
    filterOptions: {
      useDisplayedColumnsOnly: true,
    },
  },
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <TableFooter>
      <div>
        <TableRow>
          {count >= 11
            ? (
              <TablePagination
                className={classes.root}
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
          // eslint-disable-next-line no-shadow
                onChangePage={(_, page) => changePage(page)}
              />

            )
            : ''}
        </TableRow>
      </div>
    </TableFooter>
  ),
});

// Main case detail component
const CaseDetail = ({ data, classes }) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }
  const dispatch = useDispatch();

  // make sure dashboard data has been loaded first for stats bar to work
  React.useEffect(() => {
    dispatch(fetchDataForDashboardDataTable());
  }, []);

  const stat = {
    numberOfPrograms: 1,
    numberOfStudies: 1,
    numberOfSubjects: 1,
    numberOfSamples: data.num_samples,
    numberOfLabProcedures: data.num_lab_procedures,
    numberOfFiles: data[filesTable.filesField].length,
  };

  const breadCrumbJson = [{
    name: 'ALL CASES /',
    to: '/cases',
    isALink: true,
  }];

  const columns = (tableConfig) => tableConfig.columns.slice(0, 10).map((column, index) => (
    {
      name: column.dataField,
      label: column.header,
      options: {
        customBodyRender: (value) => (
          <div className={classes[`tableCell${index + 1}`]}>
            {' '}
            {column.dataFromRoot ? data[column.dataField]
              : (column.formatBytes ? formatBytes(value) : value)}
            {' '}
          </div>
        ),
      },
    }
  ));

  return (
    <>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className={classes.snackBarMessage}>
            <span className={classes.snackBarMessageIcon}>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>

              {snackbarState.value}
              {'    '}
              File(s) successfully
              {' '}
              {snackbarState.action}
              {' '}
              to your files

            </span>
          </div>
)}
      />
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.innerContainer}>
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
                  {leftPanel.slice(0, 3).map((section) => (
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
                  {rightPanel.slice(0, 3).map((section) => (
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
      </div>
      {
        samplesTable.display
          ? (
            <div id="table_case_detail_samples" className={classes.tableContainer}>
              <div className={classes.tableDiv}>
                <div className={classes.tableTitle}>
                  <span className={classes.tableHeader}>{samplesTable.title}</span>
                </div>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <FileGridView
                        data={data[samplesTable.filesField]}
                        columns={columns(samplesTable)}
                        options={options(classes, samplesTable)}
                        customOnRowsSelect={FileOnRowsSelect}
                        openSnack={openSnack}
                        closeSnack={closeSnack}
                        disableRowSelection={FileDisableRowSelection}
                        bottonText={samplesTable.bottonText}
                        messageData={samplesTable.helpMessage}
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
      {
        filesTable.display
          ? (
            <div id="table_case_detail_files" className={classes.tableContainer}>
              <div className={classes.tableDiv}>
                <div className={classes.tableTitle}>
                  <span className={classes.tableHeader}>{filesTable.title}</span>
                </div>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <FileGridView
                        data={data[filesTable.filesField]}
                        columns={columns(filesTable)}
                        options={options(classes, filesTable)}
                        customOnRowsSelect={FileOnRowsSelect}
                        openSnack={openSnack}
                        closeSnack={closeSnack}
                        disableRowSelection={FileDisableRowSelection}
                        bottonText={filesTable.bottonText}
                        messageData={filesTable.helpMessage}
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
    backgroundColor: '#FFFFFF',
    padding: '0 32px',
  },
  innerContainer: {
    maxWidth: '1340px',
    margin: '0 auto',
    padding: '38px 0 0 0',
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
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '32px',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '50px',
    paddingLeft: '30px',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#3695A9',
    paddingBottom: '19px',
  },
  breadCrumb: {
    paddingTop: '3px',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
