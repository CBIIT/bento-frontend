import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { Route, Redirect, useLocation } from 'react-router-dom';
import GET_USER_DETAILS from '../../bento/authProviderData';
import globalData, { loginRoute, requestAccessRoute, PUBLIC_ACCESS } from '../../bento/siteWideConfig';
import { signInRed, signOutRed } from '../Auth/state/loginReducer';
import { deleteFromLocalStorage } from '../../utils/localStorage';
import accessLevelTypes, { userRoles, status } from '../../utils/enums';

/*
  NOTE: This detail is old Now.
  Notes For Developer: We have 3 roles in Bento System for Access Level METADATA_ONLY.
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

export function redirect(historyObject, path) {
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
  const [localLoading, setLocalLoading] = useState(true);
  const [getUserDetails, { loading }] = useLazyQuery(GET_USER_DETAILS, {
    context: { clientName: 'userService' },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { getMyUser: userDetails } = data;
      userDetails.role = userDetails.role.toLowerCase();
      userDetails.userStatus = userDetails.userStatus.toLowerCase();
      signInRed(userDetails);
      setLocalLoading(false);
    },
    onError: ({
      graphQLErrors,
    }) => {
      if (graphQLErrors) {
        signOutRed();
        deleteFromLocalStorage('userDetails');
      }

      // To retry on network errors, we recommend the RetryLink
      // instead of the onError link. This just logs the error.
      setLocalLoading(false);
    },
  });

  useEffect(() => {
    setLocalLoading(true);
    getUserDetails();
  }, [path]);

  if (loading || localLoading) return <CircularProgress />;

  return (
    <>
      {children}
    </>
  );
}

export function MixedRoute({ component: ChildComponent, ...rest }) {
  const { enableAuthentication } = globalData;
  if (!enableAuthentication) {
    return (
      <Route render={
      (props) => <ChildComponent {...props} match={rest.computedMatch} {...rest} />
    } />
    );
  }

  const { path } = rest;
  return (
    <FetchUserDetails path={path}>
      <Route render={
      (props) => <ChildComponent {...props} match={rest.computedMatch} {...rest} />
    } />
    </FetchUserDetails>
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

  // Enums
  const { NONE, METADATA_ONLY } = accessLevelTypes;
  const { ADMIN, NONMEMBER } = userRoles;
  const { ACTIVE } = status;

  const {
    isSignedIn,
    role: capitalizedRole,
    userStatus: capitalizedUserStatus,
  } = useSelector((state) => state.login);

  const role = (capitalizedRole || '').toLowerCase();
  const userStatus = (capitalizedUserStatus || '').toLowerCase();

  const { pathname } = useLocation();
  const { access, path, requiuredSignIn } = rest;
  const updatedRole = (userStatus !== ACTIVE && role !== ADMIN) ? NONMEMBER : role;
  const hasAccess = (isSignedIn && access.includes(updatedRole));

  return (
    <FetchUserDetails path={path}>
      <Route render={(props) => {
        if (PUBLIC_ACCESS === NONE) {
          if (!isSignedIn) {
            const base = loginRoute;
            const redirectPath = `${base}?redirect=${pathname}`;
            return <Redirect to={redirectPath} />;
          }

          if (!hasAccess) {
            const redirectPath = (role.toLowerCase() !== ADMIN) ? `${requestAccessRoute}?type=noAccess` : '/';
            return <Redirect to={redirectPath} />;
          }

          // Condition for admins who are inactive & skipping it for profile route.
          if (path !== '/profile' && role === ADMIN && userStatus !== ACTIVE) {
            return (
              <div><h2 style={{ textAlign: 'center' }}>Inactive Admin Account!</h2></div>
            );
          }
        }

        if (PUBLIC_ACCESS === METADATA_ONLY) {
          if (requiuredSignIn && !isSignedIn) {
            return <Redirect to="/" />;
          }

          // Condition for admins who are inactive & skipping it for profile route.
          if (requiuredSignIn && path !== '/profile'
             && role === ADMIN && userStatus !== ACTIVE) {
            return (
              <div><h2 style={{ textAlign: 'center' }}>Inactive Account!</h2></div>
            );
          }
        }

        return <ChildComponent {...props} match={rest.computedMatch} {...rest} />;
      }}
      />
    </FetchUserDetails>
  );
}

export function AdminRoute({ component: ChildComponent, ...rest }) {
  const { enableAuthentication } = globalData;
  const { ADMIN } = userRoles;
  if (!enableAuthentication) {
    return (
      <Route render={
      () => <Redirect to="/" />
    } />
    );
  }

  // Check if this one is not Admin, Send them back to Home.
  const { role } = useSelector((state) => state.login);
  if (role !== ADMIN) {
    return (
      <Route render={() => <Redirect to="/" />} />
    );
  }

  return <PrivateRoute component={ChildComponent} {...rest} />;
}

export default PrivateRoute;
