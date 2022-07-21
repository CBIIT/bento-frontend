import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import globalData, { loginRoute, requestAccessRoute } from '../../bento/siteWideConfig';

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
      if (enableAuthentication && isSignedIn) {
        return <Redirect to="/" />;
      }
      return <ChildComponent {...props} match={rest.computedMatch} {...rest} />;
    }}
    />
  );
}

function PrivateRoute({ component: ChildComponent, ...rest }) {
  const { enableAuthentication } = globalData;
  const { isSignedIn, role } = useSelector((state) => state.login);
  const { pathname } = useLocation();
  const { access } = rest;
  const hasAccess = (isSignedIn && access.includes(role));

  return (
    <Route render={(props) => {
      if (enableAuthentication && !isSignedIn) {
        const base = loginRoute;
        const redirectPath = `${base}?redirect=${pathname}`;
        return <Redirect to={redirectPath} />;
      }

      if (enableAuthentication && !hasAccess) {
        const base = requestAccessRoute;
        const redirectPath = `${base}`;
        return <Redirect to={redirectPath} />;
      }
      return <ChildComponent {...props} match={rest.computedMatch} {...rest} />;
    }}
    />
  );
}

export default PrivateRoute;
