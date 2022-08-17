/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { Route, Redirect, useLocation } from 'react-router-dom';
import GET_USER_DETAILS from '../../bento/authProviderData';
import globalData, { loginRoute, requestAccessRoute, PUBLIC_ACCESS } from '../../bento/siteWideConfig';
import { signInRed, signOutRed } from '../Auth/state/loginReducer';
import { deleteFromLocalStorage } from '../../utils/localStorage';

/*
  Notes For Developer: We have 3 roles in Bento System.
    1. non-member:
                  a. One who can NOT access any meta data,
                  b. One who can access "Request Access" page to get access of arm data.
                  c. One who never had any arms approved in past.
    2. member:
                  a. One who CAN access any meta data,
                  b. One who can access "Request Access" page to get access of additional arms data.
                  c. One who had/have one or more any arms access approved in past.
    1. Admin:
                  a. One who have all the same access like "member" except "Request Access" page.
                  b. One who have access to Admin Portal.
                  c. One who can approve or reject requests for Arm level data access.
*/

export function afterLoginRedirect(historyObject, path) {
  historyObject.push(path);
}

export function LoginRoute({ component: ChildComponent, ...rest }) {
  const { enableAuthentication } = globalData;
  const isSignedIn = useSelector((state) => state.login.isSignedIn);
  return (
    <Route render={(props) => {
      if ((enableAuthentication && isSignedIn) || !enableAuthentication) {
        return <Redirect to="/" />;
      }
      return <ChildComponent {...props} match={rest.computedMatch} {...rest} />;
    }}
    />
  );
}

export function FetchUserDetails(props) {
  const { children, path } = props;
  const [getUserDetails, { loading, error, data }] = useLazyQuery(GET_USER_DETAILS, {
    context: { clientName: 'userService' },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getUserDetails().then((response) => {
      const { data: responseData, error: responseError } = response;
      if (responseError && responseError.graphQLErrors) {
        signOutRed();
        deleteFromLocalStorage('userDetails');
      } else if (responseData && responseData.getMyUser) {
        signInRed(responseData.getMyUser);
      }
    });
  }, [path]);

  if (loading) return <CircularProgress />;

  return (
    <>
      {children}
    </>
  );
}

function PrivateRoute({ component: ChildComponent, ...rest }) {
  const { enableAuthentication } = globalData;
  if (!enableAuthentication) {
    return (
      <Route render={
      (props) => <ChildComponent {...props} match={rest.computedMatch} {...rest} />
    } />
    );
  }

  const { isSignedIn, role } = useSelector((state) => state.login);
  const { pathname } = useLocation();
  const { access, path } = rest;
  const updateRole = (role === 'non-member' && PUBLIC_ACCESS === 'Metadata Only') ? 'member' : role;
  const hasAccess = (isSignedIn && access.includes(updateRole));

  return (
    <FetchUserDetails path={path}>
      <Route render={(props) => {
        if (enableAuthentication && !isSignedIn) {
          const base = loginRoute;
          const redirectPath = `${base}?redirect=${pathname}`;
          return <Redirect to={redirectPath} />;
        }

        if (enableAuthentication && !hasAccess) {
          const redirectPath = (role !== 'admin') ? `${requestAccessRoute}?type=noAccess` : '/';
          return <Redirect to={redirectPath} />;
        }
        return <ChildComponent {...props} match={rest.computedMatch} {...rest} />;
      }}
      />
    </FetchUserDetails>
  );
}

export function AdminRoute({ component: ChildComponent, ...rest }) {
  const { enableAuthentication } = globalData;
  if (!enableAuthentication) {
    return (
      <Route render={
      (props) => <Redirect to="/" />
    } />
    );
  }

  return <PrivateRoute component={ChildComponent} {...rest} />;
}

export default PrivateRoute;
