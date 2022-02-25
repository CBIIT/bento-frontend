/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React from 'react';
import {
  Button,
  makeStyles,
} from '@material-ui/core';
import { useGoogleAuth } from './GoogleAuthProvider';

// styles
const useStyles = makeStyles(() => ({

  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '11px',
    letterSpacing: '1.25px',
    fontWeight: '800',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRootNoRightPadding: {
    padding: '9px 20px 0px 20px',
  },
}));

const IndexPage = () => {
  const {
    isSignedIn, signIn, signOut,
  } = useGoogleAuth();
  const classes = useStyles();

  return (
    <>
      {!isSignedIn && (
      <Button classes={{ text: classes.logotype, root: classes.buttonRootNoRightPadding }} className={classes.logotype} onClick={() => signIn()}>
        Sign in
      </Button>
      )}

      {isSignedIn && (
        <>
          <Button classes={{ text: classes.logotype, root: classes.buttonRootNoRightPadding }} className={classes.logotype} onClick={signOut}>
            { sessionStorage.getItem('username')}
          </Button>
          {/* <Button onClick={signOut}>Sign Out</Button> */}
        </>
      )}
    </>
  );
};

export default IndexPage;
