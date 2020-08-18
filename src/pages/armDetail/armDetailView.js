import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CustomDataTable } from 'bento-components';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Arms.Icon.svg';
import fileCountIcon from '../../assets/icons/Program_Detail.FileCount.svg';
import {
  header,
  subsections,
  tableConfig,
} from '../../bento/armDetailData';
import formatBytes from '../../utils/formatBytes';
import { fetchDataForDashboardDataTable, singleCheckBox } from '../dashboard/dashboardState';
import Widget from '../../components/Widgets/WidgetView';
import CustomActiveDonut from '../../components/Widgets/PieCharts/CustomActiveDonut/CustomActiveDonutController';
import PropertySubsection from '../../components/PropertySubsection/armDetailSubsection';

const FileCount = ({ num_files: numFiles, classes }) => (
  <div className={classes.widgetContainer}>
    <div className={classes.numberOfFiles}>Number of Files</div>

    <Grid container className={classes.fileCountContainer}>
      <Grid item xs={12}>
        <div className={classes.fileIconContainer}>
          <img
            src={fileCountIcon}
            alt="Bento file count icon"
            className={classes.fileIcon}
          />
          <div className={classes.fileCountText}>
            <span className={classes.fileNumber}>{numFiles}</span>
          </div>
        </div>
      </Grid>
    </Grid>
  </div>
);

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
const ArmDetail = ({ data, classes }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Update dashboard first
    dispatch(fetchDataForDashboardDataTable());
  }, []);

  const redirectTo = async () => {
    await dispatch(fetchDataForDashboardDataTable());
    dispatch(singleCheckBox([{
      groupName: 'Arm',
      name: data.study_info,
      datafield: 'study_info',
      isChecked: true,
    }]));
  };

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
  const stat = {
    numberOfPrograms: 1,
    numberOfStudies: 1,
    numberOfSubjects: data.num_subjects,
    numberOfSamples: data.num_samples,
    numberOfLabProcedures: data.num_lab_procedures,
    numberOfFiles: data.num_files,
  };

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                className={classes.caseIcon}
                src={icon}
                alt="Bento arm detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                {`${header.label} :`}
                { data[header.dataField]
                  ? (
                    <span className={classes.headerMainTitleTwo}>
                      {' '}
                      {data[header.dataField]}
                    </span>
                  )
                  : (
                    <Typography variant="h5" color="error" size="sm">
                      {`"${header.dataField}" is not a valid property name`}
                    </Typography>
                  )}
              </div>
            </div>
            { /* Case Count */ }
            <div className={classes.headerButton}>
              <div className={classes.headerButtonLinkArea}>
                <span className={classes.headerButtonLinkText}>Number of cases:</span>
                <Link
                  className={classes.headerButtonLink}
                  to={(location) => ({ ...location, pathname: '/cases' })}
                  onClick={() => redirectTo()}
                >
                  <span className={classes.headerButtonLinkNumber}>
                    {data.num_subjects}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <Grid container className={classes.detailContainer}>
            {/* Left panel */}
            <Grid item lg={7} sm={6} xs={12} className={classes.detailPanel}>
              <div className={classes.innerPanel}>
                <Grid container spacing={2}>
                  { subsections.slice(0, 6).map((section, index) => (
                    <PropertySubsection key={index} section={section} data={data} />
                  ))}
                </Grid>
              </div>
            </Grid>
            {/* Left panel end */}
            {/* Right panel */}
            <Grid item lg={5} sm={6} xs={12} className={classes.detailPanel}>
              <div className={classes.innerPanel}>
                {/* Diagnosis donut */}
                <div className={classes.widgetContainer}>
                  <Widget
                    title="Diagnosis"
                    color="#0296C9"
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                    titleClass={classes.widgetTitle}
                    noPaddedTitle
                  >
                    <CustomActiveDonut
                      data={data.diagnoses}
                      width={208}
                      height={210}
                      innerRadius={50}
                      outerRadius={75}
                      cx="50%"
                      cy="50%"
                      fontSize="15px"
                    />
                  </Widget>
                </div>
                {/* File count */}
                <FileCount classes={classes} num_files={data.num_files} />
              </div>
            </Grid>
            {/* Right panel end */}
          </Grid>
          <div id="table_case_detail" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              { tableConfig.display
                ? (
                  <>
                    <div className={classes.tableTitle}>
                      <span className={classes.tableHeader}>{tableConfig.title}</span>
                    </div>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <CustomDataTable
                            data={data[tableConfig.filesField]}
                            columns={columns.slice(0, 10)}
                            options={options(classes)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : null}
            </div>
          </div>
        </div>
      </div>
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
    paddingTop: '38px',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFF',
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
    paddingRight: '12px',
    borderBottom: '#737DB8 10px solid',
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
  headerButton: {
    float: 'right',
    width: '186px',
    height: '39px',
    marginTop: '20px',
    background: '#F4F4F4',
  },
  headerButtonLinkArea: {
    marginLeft: '27px',
    paddingTop: '4px',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamily,
    color: '#7747FF',
    fontSize: '10px',
    textTransform: 'uppercase',
    paddingRight: '2px',
    fontWeight: 600,
  },
  headerButtonLinkNumber: {
    fontFamily: theme.custom.fontFamily,
    borderBottom: 'solid #0077E3 3px',
    lineHeight: '30px',
    paddingBottom: '2px',
    margin: '0 4px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  headerButtonLink: {
    color: 'black',
    textDecoration: 'none',
    '&:visited': {
      color: 'black',
    },
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    padding: '5px 0 10px 10px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    borderBottom: 'solid 10px #737DB8',
  },
  detailPanel: {
    borderRight: 'solid 1px #81A6BA',
  },
  innerPanel: {
    height: '100%',
    minHeight: '590px',
    maxHeight: '700px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '16px',
    paddingRight: '40px',
    scrollbarColor: '#697270',
  },
  widgetContainer: {
    height: '255px',
    margin: '45px auto',
    '&:first-child': {
      marginTop: '10px',
    },
  },
  fileCountContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '162px',
    height: '162px',
    backgroundColor: '#F3F3F3',
    borderRadius: '100px',
  },
  widgetTitle: {
    textTransform: 'uppercase',
    marginTop: '9px',
    color: '#0296C9',
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
  },
  numberOfFiles: {
    textTransform: 'uppercase',
    marginBottom: '10px',
    color: '#0296C9',
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
  },
  fileCountText: {
    paddingTop: '10px',
    margin: 'auto',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: '600',
    fontFamily: 'Oswald',
    color: '#7A297D',
    '& span': {
      borderBottom: 'solid 5px',
    },
  },
  fileIconContainer: {
    width: '60px',
    margin: '30px auto',
  },
  fileIcon: {
    width: '59px',
  },
  tableContainer: {
    background: '#FFFFFF',
    padding: '0 117px',
  },
  tableHeader: {
    paddingLeft: '32px',
  },
  tableDiv: {
    maxWidth: theme.custom.maxContentWidth,
    margin: '0 auto auto auto',
    paddingTop: '30px',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '18px',
    letterSpacing: '0.025em',
    color: '#3695A9',
    paddingBottom: '19px',
  },
});

export default withStyles(styles, { withTheme: true })(ArmDetail);
