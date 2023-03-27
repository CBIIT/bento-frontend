import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../themes';

export default ({
  children,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;
  const tableBorder = '#88B4DA 1px solid';
  const backgroundColor = '#EAF1FF';
  const headerTxtColor = '#0467BD';
  const headerTxtFontFam = 'Nunito Sans Bold';
  const headerSize = '16px';
  overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
  overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.borderTop = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.borderBottom = tableBorder;
  overridesObj.MUIDataTableSelectCell.headerCell.backgroundColor = backgroundColor;
  overridesObj.MUIDataTableHeadCell.fixedHeader.backgroundColor = backgroundColor;
  overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
  overridesObj.MUIDataTableToolbar = { root: { minHeight: '15px' } };
  overridesObj.MuiTablePagination.toolbar.paddingTop = '11px';
  overridesObj.MUIDataTable.tableRoot.borderTop = tableBorder;
  overridesObj.MuiTableRow.head.borderBottom = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.color = headerTxtColor;
  overridesObj.MUIDataTableHeadCell.fixedHeader.fontFamily = headerTxtFontFam;
  overridesObj.MUIDataTableHeadCell.fixedHeader.fontSize = headerSize;
  overridesObj.MUIDataTableHeadCell.fixedHeader.letterSpacing = 'normal';
  overridesObj.MUIDataTableFooter.root.borderBottom = tableBorder;
  overridesObj.MUIDataTableFooter.root.borderTop = tableBorder;

  style.push(overridesObj);
  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
