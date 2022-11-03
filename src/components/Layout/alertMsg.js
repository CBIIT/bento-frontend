/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const createContext = () => {
  const ctx = React.createContext();
  const useCtx = () => {
    const contextValue = useContext(ctx);

    if (contextValue === undefined) { throw new Error('useCtx must be inside a Provider with a value'); }

    return contextValue;
  };

  return [useCtx, ctx.Provider];
};

const [useNotification, Notifications] = createContext();

export const NotifactionProvider = ({ children }) => {
  console.log('Notification');

  // States

  // Variables

  // Methods

  return (
    <Notifications
      value={{
      }}
    >
      {children}
    </Notifications>
  );
};

export { useNotification };
