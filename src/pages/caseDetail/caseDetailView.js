import React from 'react';
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
import icon from '../../assets/icons/Cases.Icon.svg';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  caseHeader,
  leftPanelSubsections,
  rightPanelSubsections,
  tableConfig,
} from '../../bento/caseDetailData';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}

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
          className={classes.root}
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

// Component to display a property
const PropertyItem = ({
  label, value, linkUrl, labelLinkUrl, classes,
}) => {
  const defaultValue = '';
  return (
    <Grid item container spacing={4}>
      <Grid item xs={6}>
        <span className={classes.title}>
          { labelLinkUrl ? <Link to={labelLinkUrl.replace('{}', value)}>{label}</Link> : label }
        </span>
      </Grid>
      <Grid item xs={6} className={classes.content}>
        { value || value === 0 ? (
          linkUrl ? <Link to={linkUrl.replace('{}', value)} className={classes.link}>{value}</Link>
            : value
        ) : defaultValue }
      </Grid>
    </Grid>
  );
};

// Component to display a subsection
const Subsection = ({ config, data, classes }) => (
  <Grid item container>
    <Grid item container direction="column" className={classes.subsection} xs={11}>
      <Grid item>
        <span className={classes.detailContainerHeader}>{config.sectionHeader}</span>
      </Grid>
      {
        config.sectionDesc
          ? (
            <Grid item><span>{config.sectionDesc}</span></Grid>
          ) : ''
      }
      {config.properties.map((prop) => (
        <PropertyItem
          key={prop.label}
          label={prop.label}
          value={data[prop.dataField]}
          classes={classes}
          linkUrl={prop.linkUrl}
          labelLinkUrl={prop.labelLinkUrl}
        />
      ))}
    </Grid>
    <Grid xs={1} />
  </Grid>
);

// Main case detail component
const CaseDetail = ({ data, classes }) => {
  const stat = {
    numberOfPrograms: 1,
    numberOfStudies: 1,
    numberOfSubjects: 1,
    numberOfSamples: data.num_samples,
    numberOfLabProcedures: data.num_lab_procedures,
    numberOfFiles: data[tableConfig.filesField].length,
  };

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
      <StatsView data={stat} />
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
              <span className={classes.headerMainTitleTwo}>
                {' '}
                {data[caseHeader.dataField]}
              </span>
            </div>
            <div className={classes.breadCrumb}>
              {' '}
              <CustomBreadcrumb data={breadCrumbJson} />
            </div>
          </div>
        </div>

        <Grid container spacing={4} className={classes.detailContainer}>
          {/* Left panel */}
          <Grid item sm={6} xs={12} container spacing={2} className={classes.detailContainerLeft}>
            {leftPanelSubsections.map((section) => (
              <Subsection
                key={section.sectionHeader}
                config={section}
                classes={classes}
                data={data}
              />
            ))}
          </Grid>
          {/* Left panel end */}
          {/* Right panel */}
          <Grid item sm={6} xs={12} container spacing={2} className={classes.detailContainerRight}>
            {rightPanelSubsections.map((section) => (
              <Subsection
                key={section.sectionHeader}
                config={section}
                classes={classes}
                data={data}
              />
            ))}
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
  paddingLeft8: {
    paddingLeft: '12px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '38px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#FFFF',
  },
  content: {
    fontSize: '12px',
  },
  marginTop23: {
    marginTop: '24px',
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
  header: {
    paddingRight: '32px',
    borderBottom: '#42779A 10px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
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
    fontSize: '22px',
    lineHeight: '24px',
    paddingLeft: '0px',
    paddingTop: '20px',
  },
  headerMainTitleTwo: {
    fontWeight: 'bold',
    letterSpacing: '0.025em',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '30px',
    overflow: 'hidden',
    paddingLeft: '3px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    paddingLeft: '3px',
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
    padding: '24px 10px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296C9',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '8px',
    padding: ' 35px 2px 63px 2px !important',
  },
  detailContainerLeft: {
    paddingTop: '8px',
    minHeight: '209px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  detailContainerRight: {
    paddingTop: '8px',
    minHeight: '209px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderLeft: '#81A6BA 1px solid',
  },
  subsection: {
    borderBottom: '#8DCAFF 1px solid',
    paddingBottom: '15px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '32px',
  },
  tableDiv: {
    maxWidth: theme.custom.maxContentWidth,
    margin: '22px auto auto auto',
  },
  headerButtonLink: {
    textDecoration: 'none',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '5px',
    paddingLeft: '17px',
    paddingRight: '16px',
  },
  title: {
    color: '#9d9d9c',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    lineHeight: '12px',
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
  breadCrumb: {
    paddingTop: '3px',
  },
  paddingTop: {
    paddingTop: '36px',
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

export default withStyles(styles, { withTheme: true })(CaseDetail);
