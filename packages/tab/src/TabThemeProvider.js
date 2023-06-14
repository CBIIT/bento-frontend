import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

export default ({
  children, extraStyles, muiTabsTheme, muiTabTheme, themes, overrides,
}) => {
  const style = [];
  const overridesObj = themes.light.overrides;

  if (extraStyles) style.push(extraStyles);

  const MuiTabs = muiTabsTheme;

  const MuiTab = muiTabTheme;

  overridesObj.MuiTabs = MuiTabs;
  overridesObj.MuiTab = MuiTab;
  style.push(overridesObj);

  const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
