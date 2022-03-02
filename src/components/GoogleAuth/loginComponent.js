import React from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGoogleAuth } from './GoogleAuthProvider';
import AfterSignInComponent from './components/afterSignInComponent';

// styles
const styles = () => ({

  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '13px',
    letterSpacing: '1.25px',
    fontWeight: '800',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRootNoRightPadding: {
    padding: '9px 20px 0px 20px',
  },
});

const IndexPage = ({ classes }) => {
  const {
    signIn, signOut,
  } = useGoogleAuth();
  // const classes = useStyles();
  const userName = useSelector((state) => state.login.userId);
  const isSignedIn = useSelector((state) => state.login.isSignedIn);

  return (
    <>
      {(isSignedIn) ? (
        <>
          <AfterSignInComponent userName={userName} signoutLink={signOut} />
        </>
      ) : (
        <Button
          onClick={() => signIn()}
          classes={{ label: classes.logotype, text: classes.buttonRootNoRightPadding }}
        >
          Sign in
        </Button>
      )}
    </>
  );
};

export default withStyles(styles)(IndexPage);
