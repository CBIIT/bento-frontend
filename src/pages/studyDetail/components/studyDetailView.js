import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StatsView from '../../../components/Stats/StatsView';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { customSorting } from '../../../utils/dashboardUtilFunctions';
import cn from '../../../utils/classNameConcat';
import icon from '../../../assets/icons/Icon-StudiesDetail.svg';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../../dashboard/dashboardState';
import CustomBreadcrumb from '../../../components/Breadcrumb/BreadcrumbView';

function studyDetailSorting(a, b) {
  if (b && !a) {
    return -1;
  }
  if (!b && a) {
    return 1;
  }
  const aNumber = a.match(/(\d+)/) ? a.match(/(\d+)/)[0] : undefined;
  const bNumber = b.match(/(\d+)/) ? b.match(/(\d+)/)[0] : undefined;
  if (aNumber && bNumber) {
    if (parseInt(bNumber, 10) > parseInt(aNumber, 10)) {
      return -1;
    }
    if (parseInt(bNumber, 10) < parseInt(aNumber, 10)) {
      return 1;
    }
  }

  return customSorting(a, b, 'alphabetical', 0);
}

const columns = [
  { name: 'arm', label: 'Arms' },
  {
    name: 'description',
    label: 'Description',
    options: {
      customBodyRender: (value) => (
        value.split('#').map((desc) => (desc === '' ? '' : <li style={{ listStyleType: 'none' }}>{desc}</li>))
      ),
    },
  },
  {
    name: 'does',
    label: 'Cohorts',
    options: {
      customBodyRender: (value) => (
        value.split('#').map((desc) => (desc === '' ? '' : <li style={{ listStyleType: 'none' }}>{desc}</li>))
      ),
    },
  },
];

const options = (classes) => ({
  selectableRows: false,
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


const StudyDetailView = ({ classes, data }) => {
  const studyData = data.study[0];
  const diagnoses = [...new Set(studyData.cases.reduce((output, caseData) => output.concat(caseData.diagnoses ? caseData.diagnoses.map((diagnosis) => (diagnosis.disease_term ? diagnosis.disease_term : '')) : []), []))];
  const fileTypes = [...new Set(data.filesOfStudy.map((fileOfStudy) => (fileOfStudy.file_type)))];
  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfBiospecimenAliquots: data.aliguotCountOfStudy,
  };

  const initDashboardStatus = () => (dispatch) => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const dispatch = useDispatch();
  const redirectTo = () => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Study',
        name: studyData.clinical_study_designation,
        datafield: 'study_code',
        isChecked: true,
      }]));
    });
  };

  function fromArmTOCohorDoes(cohorts, cohortDosing) {
    const cohortAndDosing = cohortDosing;
    let arrayDoes = [];
    const arrayCohortDes = [];
    // get cohort_does and cohort_description
    cohorts.forEach((cohort) => {
      // get cohort_does
      if (cohort.cohort_dose
              && cohort.cohort_dose !== ''
              && cohort.cohort_dose !== null) {
        arrayDoes.push(cohort.cohort_dose);
      }
      // get cohort_description
      if (cohort.cohort_description
              && cohort.cohort_description !== ''
                && cohort.cohort_description !== null) {
        arrayCohortDes.push(cohort.cohort_description);
      }
    });
    if (arrayDoes.length === 0) {
      if (arrayCohortDes.length === 0) {
        cohortAndDosing.does = '';
      } else {
        // replace cohort does with cohort desc
        arrayDoes = arrayCohortDes;
        cohortAndDosing.does = arrayDoes.sort((a, b) => studyDetailSorting(a, b)).join('#');
      }
    } else {
      cohortAndDosing.does = arrayDoes.sort((a, b) => studyDetailSorting(a, b)).join('#');
    }
    return cohortAndDosing;
  }


  const cohortAndDosingTableData = [];
  const noArmMessage = 'This study is not divided into arms';
  const noCohortMessage = 'This study is not divided into cohorts';
  if (!studyData.cohorts || studyData.cohorts.length === 0) {
  // no cohort under studyData
    if (studyData.study_arms && studyData.study_arms.length !== 0) {
    // no cohort under studyData , has arms
      studyData.study_arms.forEach((arm) => {
      // decide arm
        let cohortAndDosing = {
          arm: arm.arm || arm.arm === '' ? arm.arm : '',
          description: arm.description ? arm.description : '',
          does: '',
          cohortDescription: '',
        };
        cohortAndDosing = fromArmTOCohorDoes(arm.cohorts, cohortAndDosing);
        cohortAndDosingTableData.push(cohortAndDosing);
      });
    } else { // no cohort under studyData no arms
      cohortAndDosingTableData.push({
        arm: noArmMessage,
        description: '',
        does: noCohortMessage,
        cohortDescription: '',
      });
    }
  } else if (studyData.study_arms && studyData.study_arms.length !== 0) {
    // has cohort under studyData and arms
    studyData.study_arms.forEach((arm) => {
      // decide arm
      let cohortAndDosing = {
        arm: arm.arm || arm.arm === '' ? arm.arm : '',
        description: arm.description ? arm.description : '',
        does: '',
        cohortDescription: '',
      };
      cohortAndDosing = fromArmTOCohorDoes(arm.cohorts, cohortAndDosing);
      cohortAndDosingTableData.push(cohortAndDosing);
    });
  } else { // has cohort under studyData , no arms
    let cohortAndDosing = {
      arm: noArmMessage,
      description: '',
      does: '',
      cohortDescription: '',
    };
    cohortAndDosing = fromArmTOCohorDoes(studyData.cohorts, cohortAndDosing);
    cohortAndDosingTableData.push(cohortAndDosing);
  }

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: studyData.program.program_acronym,
    to: '',
    isALink: false,
  }];


  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={icon}
              alt="ICDC case detail header logo"
            />

          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              <span>
                {' '}
                <span>
                    Study :
                  {' '}
                  {' '}
                  {studyData.clinical_study_designation}
                </span>
              </span>
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span>
                {' '}
                {studyData.clinical_study_name}
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
                  {' '}
                  {' '}
                  {data.caseCountOfStudy}
                  {' '}
                  {' '}
                </span>
                <span className={classes.headerButtonLinkText}>CASES</span>
              </Link>
            </span>
          </div>
        </div>


        <div className={classes.detailContainer}>

          <Grid container spacing={8}>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerLeft}>
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Description</span>

                </Grid>

                <Grid item xs={12}>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {studyData.clinical_study_description}
                      {' '}
                    </span>
                  </div>
                  <div><hr className={classes.hrLine} /></div>
                </Grid>

                <Grid container spacing={8} className={classes.detailContainerItems}>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}> Study Type:</span>
                  </Grid>
                  <Grid item xs={12} spacing={0} className={classes.content}>
                    {studyData.clinical_study_type}
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}>Principal Investigators:</span>
                  </Grid>
                  <Grid item xs={12} className={classes.content}>
                    {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => (`${principalInvestigator.pi_first_name} ${principalInvestigator.pi_middle_initial} ${principalInvestigator.pi_last_name},  `)) : ''}
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}>Date of IACUC Approval:</span>
                  </Grid>
                  <Grid item xs={12} className={classes.content}>
                    {studyData.date_of_iacuc_approval}
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}>Conducted:</span>
                  </Grid>
                  <Grid item xs={12} className={classes.content}>
                    {studyData.dates_of_conduct}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <span className={classes.detailContainerHeader}>DIAGNOSES</span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={8} className={classes.paddingTop12}>
                    {diagnoses.sort((a, b) => customSorting(a, b, 'alphabetical')).map((diagnosis) => (
                      <Grid item xs={12}>
                        <span className={classes.content}>
                          {' '}
                          {diagnosis}
                        </span>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <span className={classes.detailContainerHeader}>FILE TYPE</span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={8} className={classes.paddingTop12}>
                    {fileTypes.sort((a, b) => customSorting(a, b, 'alphabetical')).map((fileType) => (
                      <Grid item xs={12}>
                        <span className={classes.content}>{fileType}</span>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.tableContainer}>

        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>COHORT AND DOSING</span>
          </div>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Typography>
                  <MUIDataTable
                    data={cohortAndDosingTableData.sort(
                      (a, b) => studyDetailSorting(a.arm, b.arm),
                    )}
                    columns={columns}
                    options={options(classes)}
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
  hrLine: {
    width: '50px',
    float: 'left',
    marginTop: '30px',
    border: '#81a6b9 2px solid',
    background: '#81a6b9',
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  content: {
    fontSize: '12px',
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
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '21px',
    borderBottom: '#81a6b9 4px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#0296c9',
    fontSize: '19px',
    height: '12px',
    lineHeight: '17px',
    paddingLeft: '3px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '35px',
    overflow: 'hidden',
    paddingLeft: '3px',
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
    fontSize: '14pt',

  },
  headerMSubTitle: {
    paddingTop: '12px',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamilySans,
    float: 'right',
    marginTop: '15px',
    width: '104px',
    height: '33px',
    background: '#F6F4F4',
    paddingLeft: '10px',
    paddingRight: '10px',

  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamilySans,
    height: '50px',
    background: '#F5F3EE',
    width: '200px',
    fontSize: '8pt',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamilySans,
    color: '#0B3556',
    fontSize: '8pt',
  },
  headerButtonLinkNumber: {
    fontFamily: theme.custom.fontFamilySans,
    borderBottom: 'solid',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '8pt',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-13px',
    width: '100px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '30px',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '525px',

  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
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
    margin: '0px -8px',

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
    color: '#0296c9',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    paddingTop: '31px',
    maxWidth: theme.custom.maxContentWidth,
    margin: '40px auto auto auto',
  },

  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#DC762F',
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
    fontFamily: theme.custom.fontFamilySans,
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
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },

});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
