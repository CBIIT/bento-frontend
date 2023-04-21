import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { signInRed, signOutRed } from '../store/actions/Actions';

import DEFAULT_CONFIG from './config';

/**
 * Generate a Authentication Provider component with the custom configuration applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { AuthProvider }
 */
export const AuthenticationMiddlewareGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const {
    config, functions,
  } = uiConfig;

  const deleteFromLocalStorage = functions && typeof functions.deleteFromLocalStorage === 'function'
    ? functions.deleteFromLocalStorage
    : DEFAULT_CONFIG.functions.deleteFromLocalStorage;

  const enableAuthentication = config && typeof config.enableAuthentication === 'boolean'
    ? config.enableAuthentication
    : DEFAULT_CONFIG.config.enableAuthentication;

  const loginPath = config && typeof config.loginPath === 'string'
    ? config.loginPath
    : DEFAULT_CONFIG.config.loginPath;

  const requestAccessPath = config && typeof config.requestAccessPath === 'string'
    ? config.requestAccessPath
    : DEFAULT_CONFIG.config.requestAccessPath;

  const PUBLIC_ACCESS = config && typeof config.PUBLIC_ACCESS === 'string'
    ? config.PUBLIC_ACCESS
    : DEFAULT_CONFIG.config.PUBLIC_ACCESS;

  const GET_USER_DETAILS = config && typeof config.GET_USER_DETAILS === 'string'
    ? config.GET_USER_DETAILS
    : DEFAULT_CONFIG.config.GET_USER_DETAILS;

  const accessLevelTypes = config && typeof config.accessLevelTypes === 'string'
    ? config.accessLevelTypes
    : DEFAULT_CONFIG.config.accessLevelTypes;

  const userRoles = config && typeof config.userRoles === 'string'
    ? config.userRoles
    : DEFAULT_CONFIG.config.userRoles;

  const membershipStatus = config && typeof config.membershipStatus === 'string'
    ? config.membershipStatus
    : DEFAULT_CONFIG.config.membershipStatus;

  const stateProps = (state) => ({
    loginState: state.login,
  });

  const dispatchProps = (dispatch) => ({
    signIn: (data) => dispatch(signInRed(data)),
    signOut: () => dispatch(signOutRed()),
  });

  const FetchUserDetails = (props) => {
    const {
      children, path, signIn, signOut,
    } = props;
    const [localLoading, setLocalLoading] = useState(true);
    const [getUserDetails, { loading }] = useLazyQuery(GET_USER_DETAILS, {
      context: { clientName: 'userService' },
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { getMyUser: userDetails } = data;
        userDetails.role = userDetails.role.toLowerCase();
        userDetails.userStatus = userDetails.userStatus.toLowerCase();
        signIn(userDetails);
        setLocalLoading(false);
      },
      onError: ({
        graphQLErrors,
      }) => {
        if (graphQLErrors) {
          signOut();
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
  };

  const LoginRoute = (props) => {
    const { component: ChildComponent, loginState, ...rest } = props;
    const { isSignedIn } = loginState;
    return (
      <Route render={(routeProps) => {
        if ((enableAuthentication && isSignedIn) || !enableAuthentication) {
          return <Redirect to="/" />;
        }
        return <ChildComponent {...routeProps} match={rest.computedMatch} {...rest} />;
      }}
      />
    );
  };

  const MixedRoute = (props) => {
    const { component: ChildComponent, ...rest } = props;
    if (!enableAuthentication) {
      return (
        <Route render={
        (routeProps) => <ChildComponent {...routeProps} match={rest.computedMatch} {...rest} />
      } />
      );
    }

    const { path } = rest;
    return (
      <FetchUserDetails path={path} {...props}>
        <Route render={
        (routeProps) => <ChildComponent {...routeProps} match={rest.computedMatch} {...rest} />
      } />
      </FetchUserDetails>
    );
  };

  const PrivateRoute = (props) => {
    const {
      component: ChildComponent, loginState, ...rest
    } = props;
    const { isSignedIn, role = '', userStatus = '' } = loginState;

    if (!enableAuthentication) {
      return (
        <Route render={
        (routeProps) => <ChildComponent {...routeProps} match={rest.computedMatch} {...rest} />
      } />
      );
    }

    // Enums
    const { NONE, METADATA_ONLY } = accessLevelTypes;
    const { ADMIN, NONMEMBER } = userRoles;
    const { ACTIVE } = membershipStatus;

    const { pathname } = useLocation();
    const { access, path, requiuredSignIn } = rest;
    const updatedRole = (userStatus !== ACTIVE && role !== ADMIN) ? NONMEMBER : role;
    const hasAccess = (isSignedIn && access.includes(updatedRole));

    return (
      <FetchUserDetails path={path} {...props}>
        <Route render={(routeProps) => {
          if (PUBLIC_ACCESS === NONE) {
            if (!isSignedIn) {
              const base = loginPath;
              const redirectPath = `${base}?redirect=${pathname}`;
              return <Redirect to={redirectPath} />;
            }

            if (!hasAccess) {
              const redirectPath = (role.toLowerCase() !== ADMIN) ? `${requestAccessPath}?type=noAccess` : '/';
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

          return <ChildComponent {...routeProps} match={rest.computedMatch} {...rest} />;
        }}
        />
      </FetchUserDetails>
    );
  };

  const AdminRoute = (props) => {
    const {
      component: ChildComponent,
      loginState,
      ...rest
    } = props;
    const { role = '' } = loginState;

    const { ADMIN } = userRoles;

    if (!enableAuthentication) {
      return (
        <Route render={
      () => <Redirect to="/" />
    }
        />
      );
    }

    // Check if this one is not Admin, Send them back to Home.
    if (role !== ADMIN) {
      return (
        <Route render={() => <Redirect to="/" />} />
      );
    }

    return <PrivateRoute component={ChildComponent} {...rest} {...props} />;
  };

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    LoginRoute: connect(stateProps, dispatchProps)(LoginRoute),
    MixedRoute: connect(stateProps, dispatchProps)(MixedRoute),
    PrivateRoute: connect(stateProps, dispatchProps)(PrivateRoute),
    AdminRoute: connect(stateProps, dispatchProps)(AdminRoute),
  };
};

export default AuthenticationMiddlewareGenerator;
