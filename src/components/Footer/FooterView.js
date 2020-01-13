import React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Typography } from '../Wrappers/Wrappers';
import cn from '../../utils/classNameConcat';
import nciLogo from '../../assets/footer/NCI-footer.logo.svg';


const VERSION = process.env.REACT_APP_APPLICATION_VERSION;

const Footer = ({ classes, data }) => {
  const location = useLocation();
  const sideBarStatus = location.pathname === '/cases' ? data.isSidebarOpened : false;
  return (
    <footer className={classnames({
      [classes.contentShift]: sideBarStatus,
    }, classes.footerComponent)}
    >
      <div className={classes.footerRow}>
        <div className={
          cn(classes.footerRowSection, classes.footerNciColumn, classes.marginRight40)
}
        >
          <img
            src={nciLogo}
            alt="nciLogo"
            className={classes.nciLogo}
          />
        </div>
        <div className={classes.footerRowSection}>
          <ul>
            <li>
              <Typography
                weight="bold"
                className={cn(classes.footerText, classes.listHeader)}
              >
              About ICDC
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/purpose">
                Purpose
                </Link>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/steeringCommittee">
              Steering Committee
                </Link>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/crdc">
             CRDC
                </Link>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <a href="mailto:icdchelpdesk@nih.gov" target="icdc">Contact Us</a>
              </Typography>
            </li>
          </ul>
        </div>
        <div className={classes.footerRowSection}>
          <ul>
            <li>
              <Typography
                weight="bold"
                className={cn(classes.footerText, classes.listHeader)}
              >
              About the Data
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/model">
              ICDC Data & Model
                </Link>
              </Typography>
            </li>

            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/crdc">
              Analyzing Data
                </Link>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/developers">
              Developers (APIs)
                </Link>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <Link className={classes.link} to="/submit">
              Submission Guide

                </Link>
              </Typography>
            </li>
          </ul>
        </div>
        <div className={classes.footerRowSection}>
          <ul>
            <li>
              <Typography
                weight="bold"
                className={cn(classes.footerText, classes.listHeader)}
              >
                More Information
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <a title="link to NCI Policies" href="http://www.cancer.gov/global/web/policies" target="icdc-nci">
                 Policies
                </a>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <a href="https://www.cancer.gov/policies/disclaimer" rel="noopener noreferrer" target="_blank">
              Disclaimer
                </a>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <a href="https://www.cancer.gov/policies/accessibility" rel="noopener noreferrer" target="_blank">
              Accessibility
                </a>
              </Typography>
            </li>
            <li>
              <Typography className={classes.footerText}>
                <a href="https://www.cancer.gov/policies/foia" rel="noopener noreferrer" target="_blank">
                FOIA
                </a>
              </Typography>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className={classes.horizontalLine} />
      </div>
      {/* <div className={cn(classes.contentJustifyCenter, classes.footerRow)}>
        <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
          <Typography>
            <a target="icdc-external" href="https://www.cancer.gov/policies/disclaimer">
              Disclaimer
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </Typography>
          <Typography>
            <a title="link to NCI Policies" href="http://www.cancer.gov/global/web/policies" target="icdc-nci">
Policies
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </Typography>
          <Typography>
            <a title="link to NCI Accessibility Policies" href="http://www.cancer.gov/global/web/policies/accessibility" target="icdc-nci">
Accessibility
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </Typography>
          <Typography><a title="link to FOIA" href="http://www.cancer.gov/global/web/policies/foia" target="icdc-nci">FOIA</a></Typography>
        </div>
      </div> */}
      <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
        <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
          <Typography>
            <a target="icdc-external" href="https://www.hhs.gov">
            U.S. Department of Health and Human Services
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </Typography>
          <Typography>
            <a target="icdc-external" href="https://www.nih.gov">
            National Institutes of Health
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </Typography>
          <Typography>
            <a target="icdc-external" href="https://www.cancer.gov">
            National Cancer Institute
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </Typography>
          <Typography>
            <a target="icdc-external" href="https://www.usa.gov">
            USA.gov
              <span
                className={classes.ext}
                aria-label="(link is external)"
              />
            </a>
          </Typography>
        </div>
      </div>
      <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
        <div
          className={cn(
            classes.extraPadding,
            classes.nciLinks,
            classes.contentJustifyCenter,
          )}
        >
          <Typography>
            <span className={classes.turningNIH}>
            NIH … Turning Discovery Into Health
              <sup>®</sup>
            </span>
          </Typography>
        </div>
      </div>
      {/* Quick and dirty for adding version number in footer */}
      <div className={cn(classes.footerRow, classes.contentJustifyLeft)}>
        <div
          className={cn(
            classes.extraPadding,
            classes.nciLinks,
            classes.contentJustifyCenter,
          )}
        >
          <Typography>
            <span className={classes.footorVersiontext}>
            Version:
              {' '}
              {VERSION}
            </span>
          </Typography>
        </div>
      </div>
      {/* End of Quick and dirty for adding version number in footer */}
    </footer>
  );
};

const styles = (theme) => ({
  contentShift: {
    width: `calc(100vw - ${theme.custom.drawerWidth})`,
    marginLeft: `${theme.custom.drawerWidth} !important`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  ext: {
    color: theme.palette.text.footerText,
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  extraPadding: {
    marginTop: '10px',
    '@media (max-width: 600px)': {
      marginTop: '0px',
    },
  },
  footerText: {
    color: theme.palette.text.footerText,
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
    fontWeight: 500,
    fontSize: 9,
    lineHeight: '1.71',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  nciLinks: {
    display: 'flex',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      marginLeft: '20px',
    },
  },
  listHeader: {
    paddingBottom: '4px',
  },
  footerComponent: {
    lineHeight: '1.42857143',
    margin: '0',
    '-webkit-font-smoothing': 'antialiased',
    background: theme.custom.footorBackground,
    color: theme.palette.text.footerText,
    padding: '24px 35px 64px 35px',
    '& ul': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },

    '& li': {
      lineHeight: '2.17',
    },

    /* Style a button like a link for accessibility */
    '& button': {
      background: 'none!important',
      color: 'inherit',
      border: 'none',
      padding: '0!important',
      font: 'inherit',
      cursor: 'pointer',
    },

    '& a, & button': {
      color: theme.palette.text.footerText,
      textDecoration: 'none',

      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'column',
    // width: '1200px',
    margin: '0 auto',

    '@media (min-width: 900px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  footerRowSection: {
    marginTop: '16px',
    '@media (max-width: 900px)': {
      margin: '16px',
    },
  },
  turningNIH: {
    fontSize: '14px',
    color: theme.palette.text.footerText,
    textDecoration: 'none',
  },
  footorVersiontext: {
    fontSize: '8px',
    color: theme.palette.text.footerText,
    textDecoration: 'none',
  },
  footerNciColumn: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '30px',
    '@media (min-width: 600px)': {
      width: '200px',
    },

    '@media (min-width: 960px)': {
      width: '300px',
    },

    '& .nciBadge': {
      border: '0',
      height: '40px',
    },
  },

  footerBar: {
    color: theme.palette.text.footerText,
    backgroundColor: '#4F536B',
    width: '100%',
    textAlign: 'center',
    '-webkit-font-smoothing': 'antialiased',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '14px',
    marginTop: '48px',
  },
  contentJustifyCenter: {
    justifyContent: 'center',
  },
  contentJustifyLeft: {
    justifyContent: 'left',
  },
  horizontalLine: {
    width: '100%',
    margin: '32px auto 16px auto',
    borderTop: '1px solid #1E394D',
  },
  marginRight40: {
    marginRight: '40px',
  },
  nciLogo: {
    '@media (min-width: 960px)': {
      width: `calc((100vw - ${theme.custom.drawerWidth})/4)`,
    },
  },
});

Footer.defaultProps = {
  hidden: false,
};

export default withStyles(styles)(Footer);
