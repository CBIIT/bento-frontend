/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { afterLoginRedirect } from '../../Layout/privateRoute';
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

function nihLoginSuccess() {
  const history = useHistory();
  const query = useQuery();
  const { authServiceLogin } = useAuth();
  const redirectPath = getRedirectPath(query);
  const nihCode = query.get('code');

  const onSuccess = () => afterLoginRedirect(history, redirectPath);
  const onError = (error) => {};

  authServiceLogin(nihCode, 'nih', 'http://localhost:3000/nihloginsuccess', onSuccess, onError);
  return (
    <div> ⚠️ Please wait communicating with server! ⚠️ </div>
  );
}

export default nihLoginSuccess;
