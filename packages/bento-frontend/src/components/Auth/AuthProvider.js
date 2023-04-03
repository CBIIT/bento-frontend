import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import env from '../../utils/env';
import { useLogin } from '@bento-core/authentication';
import { deleteFromLocalStorage } from '../../utils/localStorage';
import { redirect } from '../Layout/privateRoute';

const AUTH_API = env.REACT_APP_AUTH_SERVICE_API;
const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID || 'Sample Id';

const createContext = () => {
  const ctx = React.createContext();
  const useCtx = () => {
    const contextValue = useContext(ctx);

    if (contextValue === undefined) { throw new Error('useCtx must be inside a Provider with a value'); }

    return contextValue;
  };

  return [useCtx, ctx.Provider];
};
const [useAuth, Auth] = createContext();

export const AuthProvider = ({ children }) => {
  const {
    googleUser,
    isInitialized,
    signOut,
    isSignedIn,
  } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
  });
  const {signOutRed} = useLogin();

  const onSignOut = (history, redirectPath) => {
    (async () => {
      await fetch(`${AUTH_API}logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(() => {
        deleteFromLocalStorage('userDetails');
        signOutRed();
        signOut();
        redirect(history, redirectPath);
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
    <Auth
      value={{
        isSignedIn,
        isInitialized,
        googleUser,
        signOut: onSignOut,
        // fetchWithRefresh,
      }}
    >
      {children}
    </Auth>
  );
};
export { useAuth };
