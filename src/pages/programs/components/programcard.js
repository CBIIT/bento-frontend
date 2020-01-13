import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Wrappers/Wrappers';
import externalIcon from '../../../assets/icons/Program-ExternalLink.svg';
import dogForProgramDetail from '../../../assets/programCards/Program_Image.png';


const ProgramCard = ({
  classes, data,
}) => (
  <div className={classes.detailContainer}>
    <Grid container spacing={8}>
      <Grid item lg={12} md={12} sm={12} xs={12} className={classes.header}>
        {data.program_name}
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={12} className={classes.detailContainerLeft}>

        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.content}>
          {' '}
          {data.program_short_description}
          {' '}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>

          <span>

            <Button variant="contained" className={classes.button}>
              <Link to={`/program/${data.program_acronym}`} className={classes.headerButtonLink}>
                <span className={classes.headerButtonLinkLeft}>VIEW STUDIES </span>
                <span className={classes.headerButtonLinkBadge}>
                  <Badge color="primary" badgeContent={data.studies.length}> </Badge>
                </span>
              </Link>
            </Button>


          </span>

          <span className={classes.paddingLeft15}>
            <a href={`${data.program_external_url}`} target="icdc" className={classes.outLink}>
              {data.program_external_url}
            </a>
          </span>
          <span className={classes.paddingLeft5}>
            <img
              src={externalIcon}
              alt="dog  for program detail"
              className={classes.linkIcon}
            />
          </span>

        </Grid>
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={12} className={classes.detailContainerRight}>
        <img
          src={dogForProgramDetail}
          alt="dog  for program detail"
          className={classes.dogImage}
        />
      </Grid>
    </Grid>
  </div>
);


const styles = (theme) => ({
  paddingLeft5: {
    paddingLeft: '5px',
  },
  dogImage: {
    width: '100%',
    paddingRight: '4px',
  },
  linkIcon: {
    width: '25px',
    verticalAlign: 'middle',
  },
  outLink: {
    color: '#1db634',
    textDecoration: 'none',
    fontSize: '12px',
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
    background: '#f3f3f3',
  },

  content: {
    fontSize: '12px',
    lineHeight: '17px',
    minHeight: '50px',
  },

  paddingLeft15: {
    paddingLeft: '15px',
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
    background: '#fff',
    lineHeight: '30px',
    paddingLeft: '10px !important',
    borderBottom: '4px solid #1db634',
    color: '#1db634',
    fontWeight: 'bold',
    margin: '15px 4px 0px 4px',
  },

  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },

  headerButtonLinkLeft: {
    paddingRight: '39px',
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: '600',
  },
  headerButtonLinkBadge: {

  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-14px',
    width: '100px',
  },


  detailContainerLeft: {
    padding: '20px 2px 30px 32px !important',
    minHeight: '230px',
  },
  detailContainerRight: {
    padding: '0px !important',
    minHeight: '230px',
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
    color: '#ffffff',

  },
  button: {
    borderRadius: '0px',
    width: '178px',
    height: '30px',
    lineHeight: '18px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#3890c5',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#3890c5',
      color: '#ffffff',
      textDecoration: 'none',
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


export default withStyles(styles, { withTheme: true })(ProgramCard);
