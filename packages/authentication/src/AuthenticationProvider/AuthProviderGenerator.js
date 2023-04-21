import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useGoogleLogin } from 'react-use-googlelogin';
import { useLazyQuery } from '@apollo/client';
import { signInRed, signOutRed } from '../store/actions/Actions';
import DEFAULT_CONFIG from './config';

/**
 * Generate a context for Authentication Provider component.
 */
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

/**
 * Generate a Authentication Provider component with the custom configuration applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { AuthProvider }
 */
export const AuthProviderGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const {
    config, functions,
  } = uiConfig;

  const redirect = functions && typeof functions.redirect === 'function'
    ? functions.redirect
    : DEFAULT_CONFIG.functions.redirect;

  const storeInLocalStorage = functions && typeof functions.storeInLocalStorage === 'function'
    ? functions.storeInLocalStorage
    : DEFAULT_CONFIG.functions.storeInLocalStorage;

  const deleteFromLocalStorage = functions && typeof functions.deleteFromLocalStorage === 'function'
    ? functions.deleteFromLocalStorage
    : DEFAULT_CONFIG.functions.deleteFromLocalStorage;

  const GOOGLE_CLIENT_ID = config && typeof config.GOOGLE_CLIENT_ID === 'string'
    ? config.GOOGLE_CLIENT_ID
    : DEFAULT_CONFIG.config.GOOGLE_CLIENT_ID;

  const NIH_CLIENT_ID = config && typeof config.NIH_CLIENT_ID === 'string'
    ? config.NIH_CLIENT_ID
    : DEFAULT_CONFIG.config.NIH_CLIENT_ID;

  const NIH_AUTH_URL = config && typeof config.NIH_AUTH_URL === 'string'
    ? config.NIH_AUTH_URL
    : DEFAULT_CONFIG.config.NIH_AUTH_URL;

  const AUTH_API = config && typeof config.AUTH_API === 'string'
    ? config.AUTH_API
    : DEFAULT_CONFIG.config.AUTH_API;

  const GET_USER_DETAILS = config && typeof config.GET_USER_DETAILS === 'string'
    ? config.GET_USER_DETAILS
    : DEFAULT_CONFIG.config.GET_USER_DETAILS;

  const stateProps = () => ({
    // autocomplete: state.login.autocomplete,
  });

  const dispatchProps = (dispatch) => ({
    signIn: (data) => dispatch(signInRed(data)),
    signOut: () => dispatch(signOutRed()),
  });

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    AuthProvider: connect(stateProps, dispatchProps)((props) => {
      const { children, signIn, signOut } = props;

      const {
        googleUser,
        isInitialized,
        grantOfflineAccess,
        signOut: googleSignOut,
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
            signIn(userDetails);
            storeInLocalStorage('userDetails', userDetails);
            signInSuccess(userDetails);
          });
        } else if (rawResponse.status === 400) signInError('Error User fatching Data.');
        else if (rawResponse.status === 403) signInError('Error User fatching Data.');
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
            signOut();
            googleSignOut();
            redirect(history, redirectPath);
          })
            .catch(() => {
            });
        })();
        // this.auth.signIn();
      };

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
    }),
  };
};

export default AuthProviderGenerator;
export { useAuth };
