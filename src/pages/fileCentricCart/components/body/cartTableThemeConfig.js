import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../../themes';

export default ({
  children,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;
  const tableBorder = '#42779A 3px solid';
  overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
  overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.borderTop = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.borderBottom = tableBorder;
  overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
  overridesObj.MUIDataTableToolbar = { root: { minHeight: '15px' } };
  overridesObj.MuiTablePagination.toolbar.paddingTop = '11px';

  style.push(overridesObj);
  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
