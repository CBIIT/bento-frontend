import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { useDispatch } from 'react-redux';
import StatsView from '../../../components/Stats/StatsView';
import cn from '../../../utils/classNameConcat';
import icon from '../../../assets/icons/Icon-Programs.svg';
import dogForProgramDetail from '../../../assets/programCards/ProgramDetail_Image.jpg';
import CustomBreadcrumb from '../../../components/Breadcrumb/BreadcrumbView';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../../dashboard/dashboardState';


const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  rowsPerPageOptions: [10, 25, 50, 100],
};

const ProgramDetailView = ({ classes, data }) => {
  const initDashboardStatus = () => (dispatch) => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const dispatch = useDispatch();
  const redirectTo = (study) => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Study',
        name: study,
        datafield: 'study_code',
        isChecked: true,
      }]));
    });
  };


  const columns = [
    { name: 'program_id', label: 'Program' },
    {
      name: 'clinical_study_designation',
      label: 'Study Code',
      options: {
        customBodyRender: (value) => (
          <div className="mui_td">
            {' '}
            <Link className={classes.link} to={`/study/${value}`}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
    { name: 'clinical_study_name', label: 'Study Name' },
    { name: 'clinical_study_type', label: 'Study Type' },
    {
      name: 'numberOfCases',
      label: 'Cases',
      options: {
        customBodyRender: (value, tableMeta) => (
          <div className="mui_td">
            {' '}
            <Link
              className={classes.link}
              to={(location) => ({ ...location, pathname: '/cases' })}
              onClick={() => redirectTo(tableMeta.rowData[1])}
            >
              {value}
            </Link>
            {' '}
          </div>
        ),
      },
    },
  ];

  const programDetail = data.program[0];
  const stat = {
    numberOfStudies: data.studyCountOfProgram,
    numberOfCases: data.caseCountOfProgram,
    numberOfSamples: data.sampleCountOfProgram,
    numberOfFiles: data.fileCountOfProgram,
    numberOfBiospecimenAliquots: data.aliguotCountOfProgram,
  };
  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: programDetail.program_acronym,
    to: '/cases',
    isALink: true,
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
            <div className={cn(classes.headerMainTitle, classes.marginTop23)}>
              <span>
                {`${programDetail.program_name} (${programDetail.program_acronym})`}
              </span>
            </div>
            <CustomBreadcrumb data={breadCrumbJson} />
          </div>

        </div>


        <div className={classes.detailContainer}>

          <Grid container spacing={8}>
            <Grid item lg={8} md={8} sm={8} xs={12} className={classes.detailContainerLeft}>
              <span className={classes.content}>
                {programDetail.program_full_description
                  ? programDetail.program_full_description.split('**').map((item, i) => <p key={i}>{item}</p>) : null}
              </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12} className={classes.detailContainerRight}>
              <img
                src={dogForProgramDetail}
                alt="dog for program detail"
                className={classes.dogImage}
              />

            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.tableContainer}>

        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>STUDIES IN THIS PROGRAM</span>
          </div>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <MUIDataTable
                  data={data.studiesByProgramId}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};


const styles = (theme) => ({
  link: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#DC762F',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dogImage: {
    width: '100%',
    paddingTop: '15px',
  },
  paddingLeft8: {
    paddingLeft: '12px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: 'Raleway, sans-serif',

  },
  content: {
    fontSize: '12px',
    lineHeight: '17px',
  },
  marginTop23: {
    marginTop: '14px',
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
    textTransform: 'uppercase',
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
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
    paddingLeft: '3px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#1db634',
    fontSize: '30px',
    lineHeight: '18px',
    paddingLeft: '5px',
    paddingBottom: '8px',
  },
  headerMSubTitle: {
    paddingTop: '8px',
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
    marginTop: '-14px',
    width: '100px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '12px',
    paddingLeft: '64px',
    paddingRight: '64px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#1db634',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '8px',
    padding: ' 35px 2px 63px 2px !important',
  },
  detailContainerLeft: {
    padding: '20px 0px 30px 2px !important',
    minHeight: '330px',
  },
  detailContainerRight: {
    padding: '20px 20px 30px 20px !important',
    minHeight: '330px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '64px',
  },
  tableDiv: {
    padding: '31px 0px',
    maxWidth: theme.custom.maxContentWidth,
    margin: '10px auto',
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
  },
  title: {
    color: '#9d9d9c',
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
    color: '#1db634',
    paddingBottom: '20px',
  },
});


export default withStyles(styles, { withTheme: true })(ProgramDetailView);
