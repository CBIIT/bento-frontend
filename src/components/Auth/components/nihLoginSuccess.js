/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { redirect } from '../../Layout/privateRoute';
import { useAuth } from '../AuthProvider';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function getRedirectPath(query) {
  const state = JSON.parse(query.get('state')) || {};
  const path = `/#${state.internalRedirectPath}`;
  return path;
}

function getErrorData(query) {
  const error = query.get('error') || {};
  const errorDescription = query.get('error_description') || {};
  return { error, errorDescription };
}

function nihLoginSuccess() {
  const history = useHistory();
  const query = useQuery();
  const { authServiceLogin } = useAuth();
  const redirectPath = getRedirectPath(query);
  const nihCode = query.get('code');
  const originDomain = window.location.origin;
  const message = 'Please wait while redirecting....';
  const [notificationMessage, setNotificationMessage] = useState(message);

  const onSuccess = () => redirect(history, redirectPath);
  const onError = (error) => {};

  useEffect(() => {
    if (nihCode) {
      authServiceLogin(nihCode, 'nih', `${originDomain}/nihloginsuccess`, onSuccess, onError);
    } else {
      const { error, errorDescription } = getErrorData(query);
      if (error) {
        const errorNotification = (
          <div>
            {errorDescription}
            <span>
              .
              {' '}
              Please go back to
              {' '}
              <Link to="/#/">Home Page</Link>
              {' '}
              or
              {' '}
              <Link to="/#/login">Login Page</Link>
              {' '}
              to login again.
            </span>

          </div>
        );
        setNotificationMessage(errorNotification);
      }
    }
  }, []);

  return (
    <div>{notificationMessage}</div>
  );
}

export default nihLoginSuccess;
