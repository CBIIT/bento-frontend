import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import env from '../../utils/env';
import { signInRed, signOutRed } from './state/loginReducer';

const AUTH_API = env.REACT_APP_AUTH_API;
const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID;

const createContext = () => {
  const ctx = React.createContext();
  const useCtx = () => {
    const contextValue = useContext(ctx);

    if (contextValue === undefined) { throw new Error('useCtx must be inside a Provider with a value'); }

    return contextValue;
  };

  return [useCtx, ctx.Provider];
};
const [useGoogleAuth, AuthProvider] = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const {
    googleUser,
    isInitialized,
    grantOfflineAccess,
    signOut,
    isSignedIn,
  } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
  });

  const onSignInClick = () => {
    grantOfflineAccess().then((resp) => {
      if (resp) {
        // Hide the sign-in button now that the user is authorized, for example:

        // Send the code to the server
        (async () => {
          const rawResponse = await fetch(`${AUTH_API}/api/auth/login`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: resp }),
          }).then((response) => response.json()).catch(() => {
          });

          if (!rawResponse) return;
          const content = await rawResponse;
          localStorage.setItem('username', content.name);
          signInRed(content.name);
        })();
      } else {
        // There was an error.
      }
    }).catch(() => {
    });
    // this.auth.signIn();
  };

  const onSignOut = () => {
    (async () => {
      localStorage.removeItem('username');
      signOutRed();
      await fetch(`${AUTH_API}/api/auth/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(() => {
        signOut();
      })
        .catch(() => {
        });
    })();
    // this.auth.signIn();
  };

  /**
   * A wrapper function around `fetch` that handles automatically refreshing
   * our `accessToken` if it is within 5 minutes of expiring.
   *
   * Behaves identically to `fetch` otherwise.
   */

  return (
    <AuthProvider
      value={{
        signIn: onSignInClick,
        isSignedIn,
        isInitialized,
        googleUser,
        signOut: onSignOut,
        // fetchWithRefresh,
      }}
    >
      {children}
    </AuthProvider>
  );
};
export { useGoogleAuth };
