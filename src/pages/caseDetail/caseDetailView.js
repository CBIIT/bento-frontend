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
import { Link } from 'react-router-dom';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import icon from '../../assets/icons/Cases.Icon.svg';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';
import {
  caseHeader,
  leftPanel,
  rightPanel,
  table1,
  table2,
  externalLinkIcon,
} from '../../bento/caseDetailData';
import { fetchDataForDashboardDataTable } from '../dashboard/dashboardState';
import { manipulateLinks, dateTimeStamp } from '../../utils/helpers';
import formatBytes from '../../utils/formatBytes';

const options = (classes, tableConfig) => ({
  selectableRows: true,
  responsive: 'stacked',
  search: false,
  filter: false,
  searchable: false,
  print: false,
  viewColumns: true,
  pagination: true,
  sortOrder: {
    name: tableConfig.defaultSortField,
    direction: tableConfig.defaultSortDirection,
  },
  download: true,
  downloadOptions: {
    filename: 'Bento_case_files_download'.concat(dateTimeStamp()).concat('.csv'),
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
const CaseDetail = ({ data, filesOfSamples, classes }) => {
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
    numberOfFiles: data.files.length,
  };

  const breadCrumbJson = [{
    name: 'ALL CASES /',
    to: '/cases',
    isALink: true,
  }];

  const processedColumns = (tableConfig) => {
    const updatedTableWithLinks = manipulateLinks(tableConfig.columns);
    return updatedTableWithLinks.slice(0, 10).map((column, index) => ({
      name: column.dataField,
      label: column.header,
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
              : (
                <div className={classes[`tableCell${index + 1}`]}>
                  {' '}
                  {column.dataFromRoot ? data[column.dataField]
                    : (column.formatBytes ? formatBytes(value) : value)}
                  {' '}
                </div>
              )
              }
          </div>
        ),
      },
    }));
  };

  const filesOfSamplesObj = filesOfSamples.reduce(
    (obj, item) => ({ ...obj, [item.sample_id]: item.files }), {},
  );

  const samplesData = data.samples.map((s) => {
    const files = filesOfSamplesObj[s.sample_id];
    const sample = s;
    sample.files = files;
    return sample;
  });

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
      {table1.display
        ? (
          <div id="table_case_detail_samples" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <div className={classes.tableTitle}>
                <span className={classes.tableHeader}>{table1.tableTitle}</span>
              </div>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={samplesData}
                      columns={processedColumns(table1)}
                      options={options(classes, table1)}
                      customOnRowsSelect={table1.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table1.disableRowSelection}
                      buttonText={table1.buttonText}
                      messageData={table1.tooltipMessage}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
      {table2.display
        ? (
          <div id="table_case_detail_samples" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <div className={classes.tableTitle}>
                <span className={classes.tableHeader}>{table2.tableTitle}</span>
              </div>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={data[table2.subjectDetailField]}
                      columns={processedColumns(table2)}
                      options={options(classes, table2)}
                      customOnRowsSelect={table2.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table2.disableRowSelection}
                      buttonText={table2.buttonText}
                      messageData={table2.tooltipMessage}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
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
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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
    paddingTop: '30px',
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
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
