import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { TableContextProvider } from '@bento-core/paginated-table';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Cases.Icon.svg';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  caseHeader,
  leftPanel,
  rightPanel,
  sampleTable,
  filesTable,
} from '../../bento/caseDetailData';
import Snackbar from '../../components/Snackbar';
import SampleTableView from './SampleView/SampleTableView';
import FilesTableView from './FilesView/FilesTableView';

// Main case detail component
const CaseDetail = ({
  data,
  filesOfSamples,
  classes,
  subjectId,
}) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
    action: 'added',
  });
  function closeSnack() {
    setsnackbarState({ open: false });
  }


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
    to: '/explore',
    isALink: true,
  }];

  // those are questioning codes for ICDC only, need to remove from here.
  const filesOfSamplesObj = filesOfSamples.reduce(
    (obj, item) => ({ ...obj, [item.sample_id]: item.files }), {},
  );

  // NOTE: Needs improvement.
  const datFieldsFromRoot = [];
  sampleTable.columns.forEach((e) => (e.dataFromRoot ? datFieldsFromRoot.push(e.dataField) : null));

  const samplesData = data.samples.map((s) => {
    const files = filesOfSamplesObj[s.sample_id];
    //reverted back to prevent undefined (s) value
    const sample = { ...s };
    sample.files = files;
    if (datFieldsFromRoot.length > 0) {
      datFieldsFromRoot.forEach((e) => {
        sample[e] = data[e];
      });
    }
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
            <Grid item sm={6} xs={12} className={[classes.detailPanel, classes.leftPanel]}>
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
            <Grid item sm={6} xs={12} className={[classes.detailPanel, classes.rightPanel]}>
              <div style={{ paddingLeft: '7px' }} className={classes.innerPanel}>
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

      <div id="case_detail_table_associated_samples" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <TableContextProvider>
            <SampleTableView
              subjectId={subjectId}
              data={samplesData}
            />
          </TableContextProvider>
        </div>
      </div>

      <div id="case_detail_table_associated_files" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <TableContextProvider>
            <FilesTableView
              subjectId={subjectId}
              data={data[filesTable.subjectDetailField]}
            />
          </TableContextProvider>
        </div>
      </div>
      <div className={classes.blankSpace} />
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
    fontSize: '12px',
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
    padding: '26px 10px 26px 0px',
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
  leftPanel: {
    paddingLeft: '25px !important',
  },
  rightPanel: {
    paddingLeft: '16px !important',
  },
  innerPanel: {
    height: '100%',
    minHeight: '209px',
    maxHeight: '380px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '0px',
    scrollbarColor: '#697270',
  },
  innerPanelRight: {
    paddingLeft: '30px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '30px',
    paddingLeft: '0px',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#3695A9',
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
  blankSpace: {
    height: '73px',
    background: '#f3f3f3',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
