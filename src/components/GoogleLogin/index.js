/* eslint-disable */
import React, { useState } from 'react';
import { GoogleLogout, GoogleLogin } from 'react-google-login';


const clientId = '617246850621-95f9qhmehd380g2df86pjhrqc84n8nij.apps.googleusercontent.com';

const success = (response) => {
  console.log(response) // eslint-disable-line
};

const error = (response) => {
  console.error(response) // eslint-disable-line
};

const loading = () => {
  console.log('loading') // eslint-disable-line
};

const logout = () => {
  console.log('logout') // eslint-disable-line
};


export default () => (
  <div>

    <GoogleLogin
      clientId={clientId}
      scope="https://www.googleapis.com/auth/analytics"
      onSuccess={success}
      onFailure={error}
      onRequest={loading}
      offline={false}
      approvalPrompt="force"
      responseType="id_token"
      isSignedIn
      theme="dark"
      // disabled
      // prompt="consent"
      // className='button'
      // style={{ color: 'red' }}
    >
      <span>Analytics</span>
    </GoogleLogin>

    <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
  </div>
);
