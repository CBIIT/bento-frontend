import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;

  const MuiDialog = {
    paper: {
      width: '431px',
      height: '170px',
      borderRadius: '25px !important',
      textAlign: 'center',
      backgroundColor: '#E8DFDC !important',
      border: '2px solid #A61401',
    },
  };

  const MuiDialogContent = {
    root: {
      padding: '40px 20px 0px 20px !important',
    },
  };

  const MuiButton = {
    root: {
      width: '133px',
      height: '45px',
    },
  };

  const MuiDialogActions = {
    root: {
      justifyContent: 'center !important',
      paddingBottom: '25px !important',
    },
  };

  overridesObj.MuiDialog = MuiDialog;
  overridesObj.MuiDialogContent = MuiDialogContent;
  overridesObj.MuiButton = MuiButton;
  overridesObj.MuiDialogActions = MuiDialogActions;

  style.push(overridesObj);
  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
