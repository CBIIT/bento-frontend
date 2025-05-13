import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

export default ({
  children,
}) => {
  const theme = {
    overrides: {
    },
  };

  const computedTheme = createTheme(theme);
  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
