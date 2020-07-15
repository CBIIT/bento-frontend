/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable } from 'bento-components';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom';
import {
  pageTitle, tableTitle, table, externalLinkIcon,
  icon, numberOfFilesIcon, programBreadCrumb, pageSubTitle, attributes,
} from '../../bento/programDetailData';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import cn from '../../utils/classNameConcat';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../dashboard/dashboardState';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import Widget from '../../components/Widgets/WidgetView';
import CustomActiveDonut from '../../components/Widgets/PieCharts/CustomActiveDonut/CustomActiveDonutController';
import {
  filterData,
  getDonutDataFromDashboardData,
  getStatDataFromDashboardData,
} from '../../utils/dashboardUtilFunctions';

const ProgramView = ({ classes, data, theme }) => {
  const programData = data.programDetail;

  const dispatch = useDispatch();

  const widgetData = useSelector((state) => (
    state.dashboard
      && state.dashboard.subjectOverView
       && state.dashboard.subjectOverView.data
      ? (
        function extraData(d) {
          return {
            diagnosis: getDonutDataFromDashboardData(d, 'diagnosis'),
            file: getStatDataFromDashboardData(d, 'file'),
          };
        }(state.dashboard.subjectOverView.data.filter(
          (d) => (filterData(d,
            [{
              groupName: 'Program',
              name: programData.program_acronym,
              datafield: 'program',
              isChecked: true,
            }])
          ),
        ))
      )
      : {
        diagnosis: [],
        file: 0,
      }));

  // initDashboardStatus will be used in dispatch to
  // make sure dashboard data has be loaded first.
  const initDashboardStatus = () => () => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  React.useEffect(() => {
    // Update dashboard first
    dispatch(initDashboardStatus());
  }, []);

  const redirectTo = () => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Program',
        name: programData.program_acronym,
        datafield: 'program',
        isChecked: true,
      }]));
    });
  };

  const stat = {
    numberOfCases: data.caseCountByTrialId,
    numberOfTrials: 1,
    numberOfFiles: data.fileCountByTrialId,
  };

  const breadCrumbJson = [{
    name: `${programBreadCrumb.label}`,
    to: `${programBreadCrumb.link}`,
    isALink: true,
  }];

  function manipultateLinks(tableData) {
    tableData.forEach((column, index) => {
      if ((column.link !== undefined && column.link !== null)) {
        const linkKey = column.link.substring(
          column.link.lastIndexOf('{') + 1,
          column.link.lastIndexOf('}'),
        );
        const linktext = column.link.split('{')[0];
        if (linktext.startsWith('/')) {
          tableData[index].internalLink = true;
        } else {
          tableData[index].externalLink = true;
        }
        const arrayIndex = tableData.findIndex((p) => p.field === linkKey);
        tableData[index].actualLink = linktext;
        tableData[index].actualLinkId = arrayIndex;
      }
    });
    return tableData;
  }

  const updatedData = manipultateLinks(table.data);

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
              : column.field === 'num_subjects' ? <Link className={classes.link} to={(location) => ({ ...location, pathname: '/cases' })} onClick={() => redirectTo()}>{value}</Link>
                : `${value}`
}
        </div>
      ),
    },
  }));

  const options = {
    selectableRows: 'none',
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
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
  };

  return (
    <>
      <StatsView data={stat} />
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
                {' '}
                {pageTitle.label}
                <span>
                  {' '}
                  {' '}
                  {programData[pageTitle.field]}
                </span>
              </span>
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span>
                {' '}
                {programData[pageSubTitle.field]}
              </span>

            </div>
            <CustomBreadcrumb data={breadCrumbJson} />
          </div>
          <div className={classes.headerButton}>
            <span className={classes.headerButtonLinkSpan}>
              <Link
                className={classes.headerButtonLink}
                to={(location) => ({ ...location, pathname: '/cases' })}
                onClick={() => redirectTo()}
              >
                {' '}
                <span className={classes.headerButtonLinkText}> View </span>
                <span className={classes.headerButtonLinkNumber}>

                  {programData.num_subjects}

                </span>
                <span className={classes.headerButtonLinkText}>CASES</span>
              </Link>
            </span>
          </div>
        </div>

        <div className={classes.detailContainer}>

          <Grid container spacing={5}>
            <Grid item sm={6} xs={12} container spacing={2}>
              <Grid container spacing={4} direction="row" className={classes.detailContainerLeft}>
                {console.log(programData)}
                {console.log(attributes)}
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Program</span>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {programData.program_acronym}
                      {' '}
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>
                    Program Name
                  </span>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {programData.program_name}
                      {' '}
                    </span>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Program Id</span>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {programData.program_id}
                      {' '}
                    </span>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Program Description</span>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {programData.program_full_description}
                      {' '}
                    </span>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Institution</span>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {programData.institution_name}
                      {' '}
                    </span>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>External Link to Program</span>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      <a href={`${programData.program_external_url}`} target="_blank" rel="noopener noreferrer">External Link to Program</a>
                      {' '}
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sm={6}
              xs={12}
              container
              spacing={2}
            >
              <Grid container spacing={16} direction="row" className={classes.detailContainerLeft}>
                <Grid item xs={12} className={classes.marginTopN37}>
                  <Widget

                    title="Diagnosis"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                    color={theme.palette.dodgeBlue.main}
                    titleClass={classes.widgetTitle}
                    customBackGround
                  >
                    <CustomActiveDonut
                      data={widgetData.diagnosis}
                      width={400}
                      height={225}
                      innerRadius={50}
                      outerRadius={75}
                      cx="50%"
                      cy="50%"
                      fontSize="15px"
                    />
                  </Widget>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Number of files </span>

                </Grid>

                <Grid item xs={12}>
                  <div>
                    <span className={classes.fileIcon}>
                      <img src={numberOfFilesIcon.src} alt={numberOfFilesIcon.alt} />
                    </span>
                    <span className={classes.fileContent}>
                      {programData.num_files}
                    </span>
                  </div>
                </Grid>

              </Grid>
            </Grid>

          </Grid>
        </div>
      </div>
      <div id="table_trial_detail" className={classes.tableContainer}>

        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>{tableTitle}</span>
          </div>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Typography>
                  <CustomDataTable
                    data={data.programDetail.studies}
                    columns={columns}
                    options={options}
                  />
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  firstColumn: {
    maxWidth: '45%',
  },
  secondColumn: {
    maxWidth: '30%',
  },
  thirdColumn: {
    maxWidth: '25%',
  },
  widgetTitle: {
    color: '#0296c9',
    textTransform: 'uppercase',
    fontFamily: 'Lato !important',
    fontWeight: '500 !important',
  },
  borderLeft: {
    borderLeft: '#81A6BA 1px solid',
    paddingLeft: '25px !important',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#DD401C',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#FFFF',
    paddingBottom: '16px',
  },
  content: {
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
    lineHeight: '14px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  root2: {
    display: 'none',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '21px',
    borderBottom: '#4B619A 10px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    '& > span': {
      fontWeight: '300',
      letterSpacing: '0.017em',
    },

    '& > span > span': {
      fontWeight: 'bold',
      letterSpacing: '0.025em',
    },
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#415589 ',
    fontSize: '18pt',
    lineHeight: '24px',
    paddingLeft: '0px',

  },
  headerSubTitleCate: {
    color: '#5F85A2',
    fontWeight: '300',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '15px',
    overflow: 'hidden',
    lineHeight: '24px',
    paddingLeft: '2px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '14px',

  },
  headerMSubTitle: {
    paddingTop: '3px',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamily,
    float: 'right',
    marginTop: '15px',
    width: '104px',
    height: '33px',
    background: '#F6F4F4',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginRight: '-20px',

  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamily,
    height: '50px',
    background: '#F5F3EE',
    width: '200px',
    fontSize: '8pt',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamily,
    color: '#0B3556',
    fontSize: '8pt',
    textTransform: 'uppercase',
  },
  headerButtonLinkNumber: {
    fontFamily: theme.custom.fontFamily,
    borderBottom: 'solid',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '8pt',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-6px',
    width: '82px',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.2))',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '24px',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '525px',

  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296c9',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding: ' 35px 0 63px 2px !important',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '5px  20px 5px 2px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px -5px -8px',

  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerRight: {
    padding: '5px 0 5px 20px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '500px',
    width: 'calc(100% + 8px)',
  },

  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '32px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    maxWidth: theme.custom.maxContentWidth,
    margin: '22px auto auto auto',
  },

  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#c32c2e',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    borderRadius: '22px',
    padding: '0 22px',
    width: '150px',
    height: '35px',
    lineHeight: '14px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '7px',
    paddingLeft: '7px',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamily,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296c9',
    paddingBottom: '20px',
  },
  fileIcon: {
    '& img': {
      width: '25%',
    },
  },
  fileContent: {
    paddingBottom: '11px',
    lineHeight: '100px',
    verticalAlign: 'top',
    fontSize: '33px',
    color: '#C53B27',
    fontWeight: 'bold',
    borderBottom: '#C53B27 solid 6px',
    marginLeft: '40px',
    fontFamily: 'Oswald',

  },
  paddingTop32: {
    paddingTop: '36px !important',
  },
  marginTopN37: {
    marginTop: '-37px',
  },
  tableCell1: {
    paddingLeft: '25px',
    width: '200px',
  },
  tableCell2: {
    width: '370px',
  },
  tableCell3: {
    width: '370px',
  },
  tableCell4: {
    width: '160px',
  },
  tableCell5: {
    width: '160px',
  },
});

export default withStyles(styles, { withTheme: true })(ProgramView);
