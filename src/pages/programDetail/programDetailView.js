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
  pageTitle, table, externalLinkIcon,
  icon, breadCrumb, aggregateCount,
  pageSubTitle, leftPanelattributes, rightpannel,
} from '../../bento/programDetailData';
import manipultateLinks from '../../utils/helpers';
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

  const redirectToArm = (programArm) => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Arm',
        name: programArm,
        datafield: 'study_info',
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
    name: `${breadCrumb.label}`,
    to: `${breadCrumb.link}`,
    isALink: true,
  }];

  const updatedTableData = manipultateLinks(table.columns);
  const updatedAttributesData = manipultateLinks(leftPanelattributes.data);

  const columns = updatedTableData.slice(0, 10).map((column) => ({
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
              : column.field === 'num_subjects' ? (
                <Link className={classes.link} to={(location) => ({ ...location, pathname: '/cases' })} onClick={() => redirectToArm(`${tableMeta.rowData[0]}: ${tableMeta.rowData[1]}`)}>{value}</Link>
              )
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
    sortOrder: {
      name: table.defaultSortField,
      direction: table.defaultSortDirection,
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
            <CustomBreadcrumb className={classes.breadCrumb} data={breadCrumbJson} />
          </div>

          {aggregateCount.display ? (
            <div className={classes.headerButton}>
              <span className={classes.headerButtonLinkSpan}>
                <Link
                  className={classes.headerButtonLink}
                  to={(location) => ({ ...location, pathname: `${aggregateCount.link}` })}
                  onClick={() => redirectTo()}
                >
                  {' '}
                  <span className={classes.headerButtonLinkText}>{aggregateCount.labelText}</span>
                  <span className={classes.headerButtonColumn}>{': '}</span>
                  <span className={classes.headerButtonLinkNumber}>

                    {programData[aggregateCount.field]}

                  </span>
                </Link>
              </span>
            </div>
          ) : ''}
        </div>

        <div className={classes.detailContainer}>

          <Grid container spacing={5}>
            <Grid item lg={7} sm={6} xs={12} container>
              <Grid container spacing={4} direction="row" className={classes.detailContainerLeft}>
                {updatedAttributesData.slice(0, 6).map((attribute) => (
                  <Grid item xs={12}>
                    <div>
                      {
                      attribute.internalLink
                        ? (
                          <div>
                            <span className={classes.detailContainerHeader}>{attribute.label}</span>
                            <div>
                              <span className={classes.content}>
                                {' '}
                                <Link
                                  className={classes.link}
                                  to={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].field]}`}
                                >
                                  {programData[attribute.field]}
                                </Link>
                                {' '}
                              </span>
                            </div>
                          </div>
                        )
                        : attribute.externalLink
                          ? (
                            <div>
                              <span
                                className={classes.detailContainerHeader}
                              >
                                {attribute.label}
                              </span>
                              <div>
                                <span className={classes.content}>
                                  {' '}
                                  <a
                                    href={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].field]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.link}
                                  >
                                    {programData[attribute.field]}
                                  </a>
                                  <img
                                    src={externalLinkIcon.src}
                                    alt={externalLinkIcon.alt}
                                    className={classes.externalLinkIcon}
                                  />
                                  {' '}
                                </span>
                              </div>
                            </div>
                          )
                          : attribute.internalLinkToLabel
                            ? (
                              <div>
                                <span
                                  className={classes.detailContainerHeaderLink}
                                >
                                  <a href={`${programData[attribute.field]}`} rel="noopener noreferrer">{attribute.label}</a>
                                </span>
                              </div>
                            )
                            : attribute.externalLinkToLabel
                              ? (
                                <div>
                                  <span
                                    className={classes.detailContainerHeaderLink}
                                  >
                                    <a href={`${programData[attribute.field]}`} target="_blank" rel="noopener noreferrer">{attribute.label}</a>
                                    <img
                                      src={externalLinkIcon.src}
                                      alt={externalLinkIcon.alt}
                                      className={classes.externalLinkIcon}
                                    />
                                  </span>
                                </div>
                              )
                              : (
                                <div>
                                  <span
                                    className={classes.detailContainerHeader}
                                  >
                                    {attribute.label}
                                  </span>
                                  <div>
                                    <span className={classes.content}>
                                      {' '}
                                      {programData[attribute.field]}
                                      {' '}
                                    </span>
                                  </div>
                                </div>
                              )
}
                    </div>
                  </Grid>
                ))}

              </Grid>
            </Grid>

            <Grid
              item
              lg={5}
              sm={6}
              xs={12}
            >
              <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>
                { rightpannel.widjet[0].display ? (
                  <Grid
                    item
                    xs={12}
                    className={classes.marginTopN37}
                  >
                    <Widget
                      title={rightpannel.widjet[0].label}
                      upperTitle
                      bodyClass={classes.fullHeightBody}
                      className={classes.card}
                      color={theme.palette.dodgeBlue.main}
                      titleClass={classes.widgetTitle}
                      noPaddedTitle
                    >
                      <CustomActiveDonut
                        data={widgetData[rightpannel.widjet[0].field]}
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
                ) : ''}

                { rightpannel.files[0].display ? (
                  <Grid item xs={12}>
                    <div className={classes.fileContainer}>
                      <span
                        className={classes.detailContainerHeader}
                      >
                        {rightpannel.files[0].label}
                      </span>
                      <div className={classes.fileContent}>
                        <div className={classes.fileIcon}>
                          <img
                            src={rightpannel.files[0].fileIconSrc}
                            alt={rightpannel.files[0].fileIconAlt}
                          />
                        </div>
                        <div className={classes.fileCount}>
                          {programData[rightpannel.files[0].field]}
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : ''}
              </Grid>
            </Grid>

          </Grid>
        </div>
      </div>
      { table.display ? (
        <div id="table_program_detail" className={classes.tableContainer}>

          <div className={classes.tableDiv}>
            <div className={classes.tableTitle}>
              <span className={classes.tableHeader}>{table.title}</span>
            </div>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Typography>
                    <CustomDataTable
                      data={data.programDetail[table.dataField]}
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
      ) : ''}
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
    color: '#7747FF',
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
  noDisplay: {
    display: 'none',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '35px',
    borderBottom: '#4B619A 10px solid',
    height: '80px',
    maxWidth: '1340px',
    margin: 'auto',
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '85px',
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
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',

  },
  headerSubTitleCate: {
    color: '#00B0BD',
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
  breadCrumb: {
    color: '#00B0BD',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamily,
    float: 'right',
    marginTop: '15px',
    width: '104px',
    height: '33px',
    background: '#F6F4F4',
    textAlign: 'center',
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
    color: '#7747FF',
    fontSize: '8pt',
    textTransform: 'uppercase',
  },
  headerButtonColumn: {
    color: '#000000',
  },
  headerButtonLinkNumber: {
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    borderBottom: 'solid #6690AC',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '8pt',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-23px',
    marginTop: '-21px',
    width: '107px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
  },
  detailContainer: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '24px',
    paddingLeft: '36px',
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
    fontSize: '15px',
    letterSpacing: '0.025em',
    color: '#0296C9',
  },
  detailContainerHeaderLink: {
    fontFamily: 'Raleway',
    fontSize: '14px',
    letterSpacing: '0.025em',
    color: '#0077E3',
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
    width: '103.9%',
    margin: '0px -8px -5px -21px',
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
    width: '105%',
    borderLeft: '1px solid #81A6BA',
    borderRight: '1px solid #81A6BA',
    marginLeft: '-26px',
  },

  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '30px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '53px',
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
  fileContainer: {
    paddingTop: '4px',
  },
  fileContent: {
    backgroundColor: '#F3F3F3',
    borderRadius: '50%',
    height: '162px',
    width: '162px',
    paddingLeft: '48px',
    marginLeft: '36%',
    marginTop: '25px',
  },
  fileIcon: {
    '& img': {
      width: '163%',
      padding: '21px 120px 0px 0px',
    },
  },
  fileCount: {
    lineHeight: '31.7px',
    fontSize: '30px',
    color: '#7A297D',
    fontWeight: '600',
    borderBottom: '#7A297D solid 5px',
    fontFamily: 'Oswald',
    width: 'max-content',
    padding: '15px 0px 12px 0px',
  },
  paddingTop32: {
    paddingTop: '36px !important',
  },
  marginTopN37: {
    marginTop: '8px',
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
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(ProgramView);
