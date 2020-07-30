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
  armProperties,
  tableConfig,
} from '../../bento/armDetailData';
import formatBytes from '../../utils/formatBytes';
import { fetchDataForDashboardDataTable, singleCheckBox } from '../dashboard/dashboardState';
import Widget from '../../components/Widgets/WidgetView';
import CustomActiveDonut from '../../components/Widgets/PieCharts/CustomActiveDonut/CustomActiveDonutController';

const PropertyItem = ({
  label, value, linkUrl, labelLinkUrl, classes,
}) => {
  const defaultValue = '';
  return (
    <Grid item>
      <Grid container>
        <Grid item xs={12}>
          <span className={classes.title}>
            {labelLinkUrl ? <Link to={labelLinkUrl.replace('{}', value)}>{label}</Link> : label}
          </span>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          {value || value === 0 ? (
            linkUrl ? <Link to={linkUrl.replace('{}', value)} className={classes.link}>{value}</Link>
              : value
          ) : defaultValue}
        </Grid>
      </Grid>
    </Grid>
  );
};

const FileCount = ({ num_files: numFiles, classes }) => (
  <>
    <div>Number of Files</div>

    <Grid container className={classes.fileCountContainer}>
      <Grid item xs={12}>
        <div className={classes.fileIconContainer}>
          <img
            src={fileCountIcon}
            alt="Bento file count icon"
            className={classes.fileIcon}
          />
          <div className={classes.fileCount}>
            <span className={classes.fileNumber}>{numFiles}</span>
          </div>
        </div>
      </Grid>
    </Grid>
  </>
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
        groupName: 'Arm',
        name: data.study_info,
        datafield: 'study_info',
        isChecked: true,
      }]));
    });
  };

  const stat = {
    numberOfPrograms: 1,
    numberOfStudies: 1,
    numberOfSubjects: data.num_subjects,
    numberOfSamples: data.num_samples,
    numberOfLabProcedures: data.num_lab_procedures,
    numberOfFiles: data.num_files,
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

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
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
            <span className={classes.headerButtonLinkSpan}>
              <span className={classes.headerButtonLinkText}>Number of cases</span>
              <Link
                className={classes.headerButtonLink}
                to={(location) => ({ ...location, pathname: '/cases' })}
                onClick={() => redirectTo()}
              >
                {' '}
                <span className={classes.headerButtonLinkNumber}>
                  {data.num_subjects}
                </span>
              </Link>
            </span>
          </div>
        </div>

        <Grid container spacing={1} className={classes.detailContainer}>
          {/* Left panel */}
          <Grid item sm={8} xs={12} className={classes.detailPannel}>
            <div className={classes.innerPanel}>
              <Grid container spacing={2} direction="column">
                {armProperties.map((prop) => (
                  <PropertyItem
                    label={prop.label}
                    value={data[prop.dataField]}
                    linkUrl={prop.linkUrl}
                    labelLinkUrl={prop.labelLinkUrl}
                    classes={classes}
                  />
                ))}
              </Grid>
            </div>
          </Grid>
          {/* Left panel end */}
          {/* Right panel */}
          <Grid item sm={4} xs={12} className={classes.detailPannel}>
            <div className={classes.innerPanel}>
              {/* Diagnosis donut */}
              <Grid
                item
                xs={12}
                className={classes.marginTopN37}
              >
                <Widget
                  title="Diagnosis"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  titleClass={classes.widgetTitle}
                  customBackGround
                >
                  <CustomActiveDonut
                    data={data.diagnoses.map((diag) => (
                      { item: diag.group, cases: diag.subjects }
                    ))}
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
              {/* File count */}
              <FileCount classes={classes} num_files={data.num_files} />
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
    paddingTop: '38px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
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
  headerButton: {
    fontFamily: theme.custom.fontFamily,
    float: 'right',
    marginTop: '15px',
    width: '200px',
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
    maxHeight: '617px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '16px',
    scrollbarColor: '#697270',
  },
  title: {
    color: '#0296C9',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '15px',
    lineHeight: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: '14px',
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
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
  fileCount: {
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
  tableCell1: {
    paddingLeft: '25px',
    width: '440px',
  },
  tableCell2: {
    width: '260px',
  },
  tableCell3: {
    width: '220px',
  },
  tableCell4: {
    width: '200px',
  },
  tableCell5: {
    width: '110px',
  },
  tableCell6: {
    width: '110px',
  },
});

export default withStyles(styles, { withTheme: true })(ArmDetail);
