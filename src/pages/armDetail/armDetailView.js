import React from 'react';
// import { useDispatch } from 'react-redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getOptions, getColumns, CustomActiveDonut } from 'bento-components';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Arms.Icon.svg';
import fileCountIcon from '../../assets/icons/Program_Detail.FileCount.svg';
import {
  header,
  subsections,
  table,
  tooltipContent,
} from '../../bento/armDetailData';
import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
} from '../dashboardTab/store/dashboardReducer';
import Widget from '../../components/Widgets/WidgetView';
import PropertySubsection from '../../components/PropertySubsection/armDetailSubsection';
import NumberOfThings from '../../components/NumberOfThings';
import Snackbar from '../../components/Snackbar';
import colors from '../../utils/colors';

// Main case detail component
const ArmDetail = ({ data, classes }) => {
  // const dispatch = useDispatch();

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

  const redirectTo = () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'studies',
      groupName: 'Arm',
      isChecked: true,
      name: data.study_info,
      section: 'Filter By Cases',
    }]);
  };

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
                alt="Bento arm detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle} id="arm_detail_title">
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
                  <span className={classes.headerButtonLinkNumber} id="arm_detail_header_file_count">
                    {data.num_subjects}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <Grid container className={classes.detailContainer}>
            {/* Left panel */}
            <Grid item lg={7} sm={6} xs={12} className={[classes.detailPanel, classes.leftPanel]}>
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
            <Grid item lg={5} sm={6} xs={12} className={[classes.detailPanel, classes.rightPanel]}>
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
                      fontSize="12px"
                      colors={colors}
                      titleLocation="bottom"
                      titleAlignment="center"
                    />
                  </Widget>
                </div>
                {/* File count */}
                <NumberOfThings classes={classes} number={data.num_files} icon={fileCountIcon} title="NUMBER OF FILES" alt="Bento file count icon" />
              </div>
            </Grid>
            {/* Right panel end */}
          </Grid>
          <div id="arm_detail_table" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              { table.display
                ? (
                  <>
                    <div className={classes.tableTitle} id="arm_detail_table_title">
                      <span className={classes.tableHeader}>{table.title}</span>
                    </div>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <GridWithFooter
                            tableConfig={table}
                            data={data[table.filesField]}
                            columns={getColumns(table, classes, data)}
                            options={getOptions(table, classes)}
                            customOnRowsSelect={table.customOnRowsSelect}
                            openSnack={openSnack}
                            closeSnack={closeSnack}
                            disableRowSelection={table.disableRowSelection}
                            buttonText={table.buttonText}
                            saveButtonDefaultStyle={table.saveButtonDefaultStyle}
                            ActiveSaveButtonDefaultStyle={table.ActiveSaveButtonDefaultStyle}
                            DeactiveSaveButtonDefaultStyle={table.DeactiveSaveButtonDefaultStyle}
                            tooltipMessage={table.tooltipMessage}
                            tooltipContent={tooltipContent}
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
    paddingTop: '50px',
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
    padding: '5px 0 10px 0px',
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
  leftPanel: {
    paddingLeft: '0px',
  },
  rightPanel: {
    paddingLeft: '16px !important',
  },
  innerPanel: {
    height: '100%',
    minHeight: '590px',
    maxHeight: '700px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '0px',
    paddingRight: '40px',
    scrollbarColor: '#697270',
  },
  widgetContainer: {
    height: '255px',
    margin: '45px auto',
    '&:first-child': {
      marginTop: '21px',
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
    fontSize: '17px !important',
    fontFamily: theme.custom.fontFamily,
  },
  numberOfFiles: {
    textTransform: 'uppercase',
    marginBottom: '10px',
    color: '#0296C9',
    fontSize: '17px',
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
    padding: '0 0px',
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
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
});

export default withStyles(styles, { withTheme: true })(ArmDetail);
