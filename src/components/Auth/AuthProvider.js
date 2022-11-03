import React, { useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useGoogleLogin } from 'react-use-googlelogin';
import env from '../../utils/env';
import { signInRed, signOutRed } from './state/loginReducer';
import { storeInLocalStorage, deleteFromLocalStorage } from '../../utils/localStorage';

import GET_USER_DETAILS from '../../bento/authProviderData';
import { redirect } from '../Layout/privateRoute';

const AUTH_API = env.REACT_APP_AUTH_SERVICE_API;
const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID || 'Sample Id';
const NIH_CLIENT_ID = env.REACT_APP_NIH_CLIENT_ID || 'Sample Id';
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

  const [getUserDetails] = useLazyQuery(GET_USER_DETAILS, { context: { clientName: 'userService' }, fetchPolicy: 'no-cache' });

  const originDomain = window.location.origin;

  async function authServiceLogin(
    code, IDP, redirectUri, signInSuccess = () => {}, signInError = () => {},
  ) {
    const rawResponse = await fetch(`${AUTH_API}login`, {
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
      /*
        NOTE FOR Developers: Calling /api/users/graphql with "getMyUser" every time after login.
        This call will create user profile in the database.
      */

      getUserDetails().then((response) => {
        const {
          data: { getMyUser: userDetails },
        } = response;
        userDetails.role = userDetails.role.toLowerCase();
        userDetails.userStatus = userDetails.userStatus.toLowerCase();
        signInRed(userDetails);
        storeInLocalStorage('userDetails', userDetails);
        signInSuccess(userDetails);
      });
    } else if (rawResponse.status === 400) signInError('⛔️ User not registered or not found!');
    else if (rawResponse.status === 403) signInError('❌ User has not been approved!');
    else signInError('Internal Error');
  }

  const signInWithGoogle = (success = () => {}, error = () => {}) => {
    grantOfflineAccess().then((resp) => {
      if (resp) {
        // Send the code to auth service
        authServiceLogin(resp, 'google', originDomain, success, error);
      } else {
        error();
      }
    }).catch(() => {
    });
  };

  const signInWithNIH = (state) => {
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
