import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import ProgramCard from './components/programcard';
import icon from '../../assets/icons/Icon-Programs.svg';
import cn from '../../utils/classNameConcat';


const Programs = ({ classes, data }) => (
  <>
    <Stats />

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
                  Programs
            </span>
          </div>
        </div>

      </div>


      <div className={classes.detailContainer}>

        <Grid container className={classes.gridContainer}>
          {data.program.map((programCardData) => (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ProgramCard data={programCardData} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  </>
);

const styles = (theme) => ({
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
  gridContainer: {
    width: 'calc(100% + 8px) !important',
  },
  container: {
    paddingTop: '50px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#f3f3f3',

  },
  marginTop23: {
    marginTop: '23px',
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

export default withStyles(styles, { withTheme: true })(Programs);
