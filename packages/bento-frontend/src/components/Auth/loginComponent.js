import React from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from './AuthProvider';
import AfterSignInComponent from './components/afterSignInComponent';
import globalData, { loginRoute, REDIRECT_AFTER_SIGN_OUT } from '../../bento/siteWideConfig';

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
  const history = useHistory();
  const redirectAfterSignOut = REDIRECT_AFTER_SIGN_OUT;

  const userName = firstName || (email && email.substring(0, email.lastIndexOf('@')));

  const redirectToLogin = () => window.location.replace(`/#${loginRoute}`);

  globalData.authProviders = globalData.authProviders.concat(['google']);

  const signOutLink = () => {
    signOut(history, redirectAfterSignOut);
  };

  return (
    <>
      {globalData.enableAuthentication && (typeof globalData.authProviders === 'undefined' || globalData.authProviders.includes('google') || globalData.authProviders.includes('Google') || globalData.authProviders === []) && (
      <>
        { (isSignedIn) ? (
          <>
            <AfterSignInComponent userName={userName} signoutLink={signOutLink} />
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
