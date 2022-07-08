import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import env from '../../utils/env';
import { signInRed, signOutRed } from './state/loginReducer';

const AUTH_API = env.REACT_APP_AUTH_SERVICE_API;
const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID;
const NIH_CLIENT_ID = env.REACT_APP_NIH_CLIENT_ID;
const NIH_AUTH_URL = env.REACT_APP_NIH_AUTH_URL || 'https://stsstg.nih.gov/auth/oauth/v2/authorize';

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
    grantOfflineAccess,
    signOut,
    isSignedIn,
  } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
  });

  const onError = () => {};

  async function authServiceLogin(
    code, IDP, redirectUri, signInSuccess = () => {}, signInError = onError,
  ) {
    const rawResponse = await fetch(`${AUTH_API}/api/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, IDP, redirectUri }),
    }).then((response) => response).catch(() => {
    });

    const responseData = rawResponse.json();
    if (!responseData) return;
    if (rawResponse.status === 200) {
      const content = await responseData;

      // TODO: Find some better solution to store data in local storage.
      localStorage.setItem('username', content.name);
      signInRed(content.name);

      signInSuccess();
    } else if (rawResponse.status === 400) signInError('⛔️ User not registered or not found!');
    else if (rawResponse.status === 403) signInError('❌ User has not been approved!');
    else signInError('Internal Error');
  }

  const signInWithGoogle = (success = () => {}, error = () => {}) => {
    grantOfflineAccess().then((resp) => {
      if (resp) {
        // Send the code to auth service
        authServiceLogin(resp, 'google', 'http://localhost:4010', success, error);
      } else {
        error();
      }
    }).catch(() => {
    });
  };

  const signInWithNIH = (state) => {
    const originDomain = window.location.origin;
    const urlParam = {
      client_id: NIH_CLIENT_ID,
      redirect_uri: `${originDomain}/nihloginsuccess`,
      response_type: 'code',
      scope: 'openid email profile',
      state: JSON.stringify(state || {}),
    };

    const params = new URLSearchParams(urlParam).toString();
    window.location.href = `${NIH_AUTH_URL}?${params}`;
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
    <Auth
      value={{
        signInWithGoogle,
        signInWithNIH,
        isSignedIn,
        isInitialized,
        googleUser,
        signOut: onSignOut,
        authServiceLogin,
        // fetchWithRefresh,
      }}
    >
      {children}
    </Auth>
  );
};
export { useAuth };
