import React from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useAuth } from './AuthProvider';
import AfterSignInComponent from './components/afterSignInComponent';
import globalData, { loginRoute } from '../../bento/siteWideConfig';

// styles
const styles = () => ({

  logotype: {
    whiteSpace: 'nowrap',
    color: '#24E4BE',
    fontFamily: 'Raleway',
    fontSize: '13px',
    letterSpacing: '1.25px',
    fontWeight: '800',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRootNoRightPadding: {
    padding: '9px 0px 0px 20px',
  },
});

const IndexPage = ({ classes }) => {
  const {
    signOut,
  } = useAuth();
  // const classes = useStyles();
  const {
    isSignedIn, email, firstName,
  } = useSelector((state) => state.login);

  const redirectToLogin = () => window.location.replace(`/#${loginRoute}`);

  return (
    <>
      {globalData.enableAuthentication && (typeof globalData.authEndPoint === 'undefined' || globalData.authEndPoint.includes('google') || globalData.authEndPoint.includes('Google') || globalData.authEndPoint === []) && (
      <>
        { (isSignedIn) ? (
          <>
            <AfterSignInComponent userName={firstName || email} signoutLink={signOut} />
          </>
        ) : (
          <>
            <Button
              onClick={redirectToLogin}
              classes={{ label: classes.logotype, text: classes.buttonRootNoRightPadding }}
            >
              Login
            </Button>
          </>
        )}
      </>
      )}
    </>
  );
};

export default withStyles(styles)(IndexPage);
