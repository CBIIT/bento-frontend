import React, { useContext } from 'react';
import NotificationFunctions from '../Notifications/NotificationFunctions';

const createContext = () => {
  const ctx = React.createContext();
  const useCtx = () => {
    const contextValue = useContext(ctx);

    if (contextValue === undefined) { throw new Error('useCtx must be inside a Provider with a value'); }
    return contextValue;
  };

  return [useCtx, ctx.Provider];
};

const [useGlobal, Global] = createContext();

export const GlobalProvider = ({ children }) => {
  const Notification = NotificationFunctions();

  return (
    <Global
      value={{
        Notification,
      }}
    >
      {children}
    </Global>
  );
};

export { useGlobal };
