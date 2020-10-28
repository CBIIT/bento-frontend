import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch } from 'react-redux';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import icon from '../../assets/icons/Cases.Icon.svg';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  caseHeader,
  leftPanel,
  rightPanel,
  table1,
  table2,
  externalLinkIcon,
} from '../../bento/caseDetailData';
import { fetchDataForDashboardDataTable } from '../dashboard/dashboardState';
import { getOptions, getColumns } from '../../utils/tables';

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

  // those are questioning codes for ICDC only, need to remove from here.
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
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        classes={classes}
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
                      columns={getColumns(table1, classes, data, externalLinkIcon)}
                      options={getOptions(table1, classes)}
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
                      columns={getColumns(table2, classes, data)}
                      options={getOptions(table2, classes)}
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
