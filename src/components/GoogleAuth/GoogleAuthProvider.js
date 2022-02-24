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
      const authCode = resp;
      console.log('auth_code');
      console.log(authCode);
    });
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
        signOut,
        // fetchWithRefresh,
      }}
    >
      {children}
    </AuthProvider>
  );
};
export { useGoogleAuth };
