import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import StatsView from './components/statsView';
import { Button } from '../../components/Wrappers/Wrappers';
import { landingPageData } from '../../bento/landingData';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';
// import cn from '../../utils/classNameConcat';


const LandingView = ({ classes, statsData }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <div className={classes.hero}>
        <Grid container spacing={16} direction="row">
          <div className={classes.heroImage} />
          <div className={classes.heroTextContainer}>
            <div className={classes.heroTextWrapper}>
              <div className={classes.headerTitle}>
                { landingPageData.heroHeaderTitle }
              </div>
              <div className={classes.headerContent}>
                { landingPageData.heroHeaderDescription}
              </div>
              <div className={classes.headerButtonSection}>
                <Link to={landingPageData.exploreCallToActionLink} className={classes.headerLink}>
                  <Button className={classes.buttonText} color="neonBlue">
                    {landingPageData.exploreCallToActionButtonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
    <div className={classes.whiteSection} />
    <StatsView stats={landingPageData.stats} statsData={statsData} />
    <div className={classes.container}>
      <div className={classes.texture}>
        <Grid container spacing={16} direction="row" className={classes.landingContainer}>
          <div className={classes.contentLeft}>
            <div className={classes.about}>
              <div className={classes.aboutImageSection}>
                <img
                  src={landingPageData.tile1.img}
                  className={classes.aboutImage}
                  alt={landingPageData.tile1.alt}
                />
              </div>
              <div className={classes.CTDCWords}>
                {landingPageData.tile1.cardTitleText}
              </div>
              <div className={classes.aboutContent}>
                {landingPageData.tile1.cardDescriptionText}
              </div>
              <div className={classes.aboutButtonSection}>
                <div className={classes.aboutButtonLeft}>
                  <img src={iconAbout} className={classes.iconAbout} alt="CTDC about icon" />
                </div>
                <div className={classes.aboutButtonRight}>
                  <Link
                    to={landingPageData.tile1.cardCallToActionLink}
                    className={classes.aboutButton}
                  >
                    {landingPageData.tile1.cardCallToActionText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRight}>
            <div className={classes.contentRightTop}>
              <div className={classes.program}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile2.img}
                    alt={landingPageData.tile2.alt}
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader}>
                    {landingPageData.tile2.cardTitleText}
                  </div>
                  <div className={classes.contentContainer}>
                    {landingPageData.tile2.cardDescriptionText}
                  </div>

                </div>
                <div className={classes.blueButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link
                      to={landingPageData.tile2cardCallToActionLink}
                      className={classes.blueButton}
                    >
                      {landingPageData.tile2.cardCallToActionText}
                    </Link>
                  </div>
                </div>
              </div>
              <div className={classes.studies}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile3.img}
                    alt={landingPageData.tile3.src}
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader}>
                    {landingPageData.tile3.cardTitleText}
                  </div>
                  <div className={classes.contentContainer}>
                    {landingPageData.tile3.cardDescriptionText}
                  </div>

                </div>
                <div className={classes.blueButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link
                      to={landingPageData.tile3.cardCallToActionLink}
                      className={classes.blueButton}
                    >
                      {landingPageData.tile3.cardCallToActionText}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className={classes.contentRightBottom}>
              <div className={classes.cases}>
                <div className={classes.mountainMeadowContentHeader}>
                  {landingPageData.tile4.cardTitleText}
                </div>
                <div className={classes.mountainMeadowContent}>
                  {landingPageData.tile4.cardDescriptionText}
                </div>
                <div className={classes.mountainMeadowButtonSection}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.mountainMeadowIcon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link
                      to={landingPageData.tile4.cardCallToActionLink}
                      className={classes.mountainMeadowButton}
                    >
                      {landingPageData.tile4.cardCallToActionText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>

    </div>
  </div>
);
const styles = () => ({
  page: {
    marginTop: '-47px',
  },
  heroImage: {
    width: '100%',
    height: '600px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${landingPageData.hero.img})`,
  },
  texture: {
    backgroundSize: 'cover',
    background: '#B6DCFC',
    padding: '120px 0 80px 0',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',

  },

  whiteSection: {
    height: '8px',
    background: 'white',
  },
  redButton: {
    height: '13px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '47px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  headerTitle: {
    paddingTop: '180px',
    paddingBottom: '12px',
    fontFamily: 'Inter, Raleway, sans-serif',
    fontSize: '40px',
    fontWeight: '600',
    lineHeight: '41px',
    color: '#0077E3',
    letterSpacing: 0.25,
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#000000',
    fontFamily: 'Lato, Raleway',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '29px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  headerLink: {
    textDecoration: 'none',
  },

  iconAbout: {
    height: '17px',
    width: '9px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  icon: {
    width: '20px',
    marginTop: '13px',
    marginLeft: '23px',
  },


  aboutImage: {
    width: '300px',
    padding: '14px',
  },
  aboutImageSection: {
  },
  CTDCWords: {
    height: '188px',
    background: '#274FA5',
    color: '#FFFFFF',
    fontSize: '26px',
    textTransform: 'uppercase',
    lineHeight: '29px',
    padding: '24px 75px 26px 26px',
    fontFamily: 'Oswald',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '15px',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
    backgroundColor: 'white',
  },
  image: {
    width: '293px',
    height: '251px',
  },
  aboutContent: {
    background: 'white',
    minHeight: '372px',
    width: '300px',
    padding: '30px 30px 32px 30px',
    color: '#000000',
    fontFamily: '"Nunito Sans"',
    fontSize: '14px',
    lineHeight: '22px',
  },
  aboutButtonSection: {
    background: 'white',
    height: '71px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#443CBB',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#7747FF',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
  },

  content: {
    width: '100%',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '6px',
    minHeight: '130px',
  },
  contentHeader: {
    color: '#033D6F',
    fontFamily: 'Lato',
    fontSize: '26px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '10px 0',
    textTransform: 'uppercase',
  },
  contentContainer: {
    width: '215px',
    color: '#010101',
    fontFamily: 'Lato',
    fontSize: '15px',
    lineHeight: '22px',
    paddingLeft: '2px',
    paddingBottom: '10px',
  },

  program: {
    float: 'left',
    padding: '0 10px 8px 0px',
  },
  programImg: {
    background: '#fff',
  },
  studies: {
    float: 'left',
  },

  contentRightBottom: {
    float: 'left',
    width: '597px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '438px',
    paddingLeft: '370px',
    paddingTop: '70px',
  },
  mountainMeadowButtonSection: {
    height: '46px',
    width: '176px',
    backgroundColor: '#10A075',
    marginTop: '20px',

  },
  blueButton: {
    height: '45px',
    background: '#0077E3',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '47px',
    fontFamily: 'Lato',
    fontSize: '14px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  mountainMeadowContentHeader: {
    color: '#033D6F',
    fontFamily: 'Oswald',
    fontSize: '31px',
    fontWeight: '500',
    lineHeight: '32px',
    padding: '15px 0',
    textTransform: 'uppercase',
  },
  mountainMeadowContent: {
    height: '143px',
    width: '166px',
    color: '#010101',
    fontFamily: 'Lato',
    fontSize: '15px',
    lineHeight: '22px',
  },
  mountainMeadowIcon: {
    width: '20px',
    marginTop: '15px',
    marginLeft: '28px',
  },
  mountainMeadowButton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
    textDecoration: 'none',
    marginLeft: '8px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '30px',
  },
  animationContainer: {
    position: 'relative',
    left: '33%',
  },

  paddingLeft2: {
    paddingLeft: '2px',
  },
  heroTextContainer: {
    position: 'absolute',
    width: 900,
    margin: 'auto',
    left: 0,
    right: 0,
  },
  heroTextWrapper: {
    width: '350px',
  },
  buttonText: {
    padding: '8px 30px',
  },

});
export default withStyles(styles, { withTheme: true })(LandingView);
