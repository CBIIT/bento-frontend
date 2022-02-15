import React from 'react';
import { useGoogleLogin } from 'react-google-login';

// const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

// nih
const clientId = '196014713877-0d926jpdd691roubuc0kpu6r6ha9b9t5.apps.googleusercontent.com';
// doddapaneni.ajay
// const clientId = '357466149206-rs20avp7k08gsb0rbgla9mstqfic4hhb.apps.googleusercontent.com';

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    sessionStorage.setItem('user', res.profileObj);

    console.log(res);

    alert(
      `Logged in successfully welcome ${res.profileObj.name} .`,
    );
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login. ',
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button onClick={signIn} className="button">

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;
