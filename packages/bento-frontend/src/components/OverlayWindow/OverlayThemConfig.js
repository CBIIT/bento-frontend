import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;

  const MuiDialog = {
    paper: {
      width: '770px',
      height: '620px',
      borderRadius: '5px !important',
      backgroundColor: '#ffffff !important',
      padding: '0px 20px 0px 20px !important',
    },
  };

  const MuiTypography = {
    root: {
      fontSize: '14px !important',
      color: '#000000',
    },
  };

  const MuiDialogTitle = {
    root: {
      padding: '15px 15px 15px 0 !important',
      '& h2': {
        fontSize: '22px !important',
      },
    },
  };

  const MuiDialogContent = {
    root: {
      color: '#000045',
      '& p': {
        fontSize: '14px',
      },
      padding: '20px 0px 0px 0px !important',
      '& ul': {
        marginTop: '0px',
        paddingTop: '0px',
      },
    },
  };

  const MuiButton = {
    root: {
      width: '133px',
      height: '35px',
      backgroundColor: '#337ab7',
      color: '#fff',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#2e6da4',
      },
    },
  };

  const MuiList = {
    root: {
      marginTop: '-15px !important',
      fontSize: '14px',
    },
    padding: {
      paddingTop: '0px !important',
    },
  };

  const MuiListItem = {
    root: {
      fontSize: '14px',
      padding: '2px 0px 0px 25px !important',
    },
  };

  const MuiListItemIcon = {
    root: {
      marginBottom: 'auto',
      fontSize: '12px',
      color: 'black',
      width: '10px',
      minWidth: '2px',
      paddingTop: '10px',
    },
  };

  const MuiDialogContentText = {
    root: {
      color: '#000000',
      marginBottom: '10px',
      '& p.lastChild': {
        marginBottom: '0px',
      },
    },
  };

  const MuiBackdrop = {
    root: {
      backgroundColor: '#00000047',
    },
  };

  const MuiDialogActions = {
    root: {
      height: '75px',
      justifyContent: 'right !important',
      padding: '30px 10px 25px 0px !important',
    },
  };

  overridesObj.MuiDialog = MuiDialog;
  overridesObj.MuiDialogContent = MuiDialogContent;
  overridesObj.MuiButton = MuiButton;
  overridesObj.MuiDialogActions = MuiDialogActions;
  overridesObj.MuiDialogTitle = MuiDialogTitle;
  overridesObj.MuiTypography = MuiTypography;
  overridesObj.MuiListI = MuiList;
  overridesObj.MuiListItem = MuiListItem;
  overridesObj.MuiListItemIcon = MuiListItemIcon;
  overridesObj.MuiDialogContentText = MuiDialogContentText;
  overridesObj.MuiBackdrop = MuiBackdrop;
  overridesObj.MuiDialogActions = MuiDialogActions;

  style.push(overridesObj);
  const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
