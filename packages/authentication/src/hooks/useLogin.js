import React from 'react';
import { signInAction, signOutAction } from '../state/loginReducer';
import {storeInLocalStorage }from '../utils/localStorage';
import { useLazyQuery } from '@apollo/client';
import { useGoogleLogin } from 'react-use-googlelogin';
import env from '../utils/env';
import { GET_USER_DETAILS } from '../data/graphQLQueries';
import { useDispatch } from 'react-redux';


const useLogin = ()=>{

    /* variables */
    const originDomain = window.location.origin;
    const AUTH_API = env.REACT_APP_AUTH_SERVICE_API;
    const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID || 'Sample Id';

    /* hooks */
    const {
        grantOfflineAccess,
      } = useGoogleLogin({
        clientId: GOOGLE_CLIENT_ID,
      });    
    const [getUserDetails] = useLazyQuery(GET_USER_DETAILS, { context: { clientName: 'userService' }, fetchPolicy: 'no-cache' });
    const dispatch = useDispatch();


    /* functions */
    const signInRed = (userDetails) => dispatch(signInAction(userDetails));

    const signOutRed = () => dispatch(signOutAction());

    const authServiceLogin = async (
        code, IDP, redirectUri, signInSuccess = () => {}, signInError = () => {},
      ) => {
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

    return {
        signInWithGoogle,
        signInWithNIH,
        signOutRed,
        authServiceLogin   
    };

};

export default useLogin;
