import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';

const createContext = () => {
  const ctx = React.createContext();
  const useCtx = () => {
    const contextValue = useContext(ctx);

    if (contextValue === undefined) { throw new Error('useCtx must be inside a Provider with a value'); }

    return contextValue;
  };

  return [useCtx, ctx.Provider];
};
const [useGoogleAuth, AuthProvider] = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const {
    googleUser,
    isInitialized,
    grantOfflineAccess,
    signOut,
    isSignedIn,
  } = useGoogleLogin({
    clientId: '196014713877-0d926jpdd691roubuc0kpu6r6ha9b9t5.apps.googleusercontent.com',
  });

  const onSignInClick = () => {
    grantOfflineAccess().then((resp) => {
      if (resp) {
        // Hide the sign-in button now that the user is authorized, for example:

        // Send the code to the server
        (async () => {
          const rawResponse = await fetch('http://localhost:4010/api/auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: resp }),
          });
          const content = await rawResponse.json();
          sessionStorage.setItem('username', content.name);
        })();
      } else {
        // There was an error.
      }
    }).catch((e) => {
      alert(e.message);
      console.error(e.message); // "oh, no!"
    });
    // this.auth.signIn();
  };

  const onSignOut = () => {
    (async () => {
      const rawResponse = await fetch('http://localhost:4010/api/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();
      console.log(content);
      signOut();
    })();
    // this.auth.signIn();
  };

  /**
   * A wrapper function around `fetch` that handles automatically refreshing
   * our `accessToken` if it is within 5 minutes of expiring.
   *
   * Behaves identically to `fetch` otherwise.
   */

  return (
    <AuthProvider
      value={{
        signIn: onSignInClick,
        isSignedIn,
        isInitialized,
        googleUser,
        signOut: onSignOut,
        // fetchWithRefresh,
      }}
    >
      {children}
    </AuthProvider>
  );
};
export { useGoogleAuth };
