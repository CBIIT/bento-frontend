/* eslint-disable react/button-has-type */
import React from 'react';
import { useGoogleAuth } from './GoogleAuthProvider';

const IndexPage = () => {
  const {
    isSignedIn, signIn, signOut,
  } = useGoogleAuth();

  return (
    <div style={{ padding: '1rem' }}>
      {!isSignedIn && (
      <button onClick={() => signIn()} style={{ marginRight: '1rem' }}>
        Sign in
      </button>
      )}

      {isSignedIn && (
        <button onClick={signOut}>Sign Out</button>
      )}
    </div>
  );
};

export default IndexPage;
