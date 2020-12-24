import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../themes';

export default ({
  children, extraStyles, tableBorder, tablecolor,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;

  if (extraStyles) style.push(extraStyles);

  if (tableBorder) {
    overridesObj.MUIDataTableToolbarSelect.root.borderTop = '2px solid #e7e5e5';
    overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
    overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeader.borderTop = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeader.borderBottom = tableBorder;
    overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
    overridesObj.MUIDataTableToolbar = { root: { minHeight: '15px' } };
    overridesObj.MuiTablePagination.toolbar.paddingTop = '11px';
  }

  const PrivateTabIndicator = {
    root: {
      transitionProperty: 'none',
      height: '0px',
    },
  };

  const MuiTabs = {
    root: {
      marginTop: '15px',
    },
    flexContainer: {
      borderBottom: '10px solid #40789C',
      overflow: 'visible !important',
    },
  };

  const MuiTab = {
    root: {
      width: '250px',
      height: '45px',
      minHeight: '40px',
      marginRight: '10px',
      background: '#EAEAEA',
      fontSize: '18px',
      fontFamily: 'Raleway',
      fontWeight: '400',
      lineHeight: '18px',
      paddingLeft: '5px',
      letterSpacing: '0.25px',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      '&$selected': {
        background: tablecolor,
        fontWeight: 'bolder',
      },
    },
    labelContainer: {

    },
  };

  overridesObj.MuiTabs = MuiTabs;
  overridesObj.MuiTab = MuiTab;
  overridesObj.PrivateTabIndicator = PrivateTabIndicator;

  style.push(overridesObj);
  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};
