import tinycolor from 'tinycolor2';

const navyBlue = '#0B3556';
const curiousBlue = '#CBE2EE';
const airForceBlue = '#5E8CA5';
const qQhite = '#EEEEEE';
const orange = '#FF7F15';
const green = '#2FA000';
const dodgeBlue = '#0296C9';
const cobolt = '#FBB35D';
const warning = '#ff7f0b';
const success = '#3CD4A0';
const info = '#3f2b2f';
const tableHeader = '#f5f5f5';
const black = 'black';

const lightenRate = 7.5;
const darkenRate = 15;
const tableHeaderBorder = '#004c73 3px solid';
const tableHeaderFontColor = '#194563';
const tableFontFamily = "'Raleway', sans-serif";

export default {
  custom: {
    maxContentWidth: '1440px',
    maxContent: 'white',
    bodyBackGround: 'white',
    cardBackGround: '#f0f6f8',
    footorBackground: '#325068',
    fontFamilySans: '"Open Sans", sans-serif',
    fontFamilyRaleway: "'Raleway', sans-serif",
    drawerWidth: '240px',
  },
  palette: {
    primary: {
      main: navyBlue,
      light: tinycolor(navyBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(navyBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    curiousBlue: {
      main: curiousBlue,
      light: tinycolor(curiousBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(curiousBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    airForceBlue: {
      main: airForceBlue,
      light: tinycolor(airForceBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(navyBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    qQhite: {
      main: qQhite,
      light: tinycolor(qQhite)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(qQhite)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    orange: {
      main: orange,
      light: tinycolor(orange)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(orange)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    dodgeBlue: {
      main: dodgeBlue,
      light: tinycolor(dodgeBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(dodgeBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    green: {
      main: green,
      light: tinycolor(green)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(green)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    cobolt: {
      main: cobolt,
      light: tinycolor(cobolt)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(cobolt)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    widgetBackground: {
      main: '#F3F8FB',
      light: tinycolor(black)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(black)
        .darken(darkenRate)
        .toHexString(),
      contrastText: 'black',
      lattice: '#F3F8F8',
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    textWithBackground: {
      main: 'black',
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      withbackground: 'white',
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9',
      link: '#1669aa',
      footerText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      light: '#F3F5FF',
    },
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
  },
  overrides: {
    MuiExpansionPanelDetails: {
      root: {
        padding: '0px',
      },
    },
    MuiList: {
      root: {
        width: '100%',
      },
    },
    MuiListItemText: {
      root: {
        padding: '0 8px',
      },
    },
    MuiListItem: {
      gutters: {
        paddingTop: '4px',
        paddingRight: '8px',
        paddingBottom: '4px',
        paddingLeft: '35px',
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: '38px',
        padding: '0 12px 0 35px',
      },
      content: {
        margin: '4px 0',
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 'none',
      },
      elevation2: {
        boxShadow: 'none',
      },
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        position: 'relative',
      },
      headerCell: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,

      },
      checkboxRoot: {
        color: 'inherit',
      },

    },
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A',
      },
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9',
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MUIDataTableHeadCell: {
      fixedHeaderCommon: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
      },
      fixedHeader: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
      },
      sortActive: {
        color: tableHeaderFontColor,
      },
      toolButton: {
        cursor: 'pointer',
        display: 'inline-flex',
        outline: 'none',
      },
    },
    MuiTableSortLabel: {
      active: {
        color: '#ff8a00',
      },
    },
    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(even)': {
          color: '#223d4c',
          background: '#f5f5f5 !important',
        },
        '&:nth-child(even) td': {
          background: '#f5f5f5',
        },
        '&:nth-child(odd)': {
          color: '#223d4c !important',
        },
        '&:nth-child(odd) td': {
          background: '#fff',
        },
      },
    },
    MuiTableRow: {
      head: {
        height: '54px',
      },
      root: {
        height: '54px',
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
        padding: '5px',
        '&:last-child': {
          paddingRight: '30px',
        },
      },
      paddingCheckbox: {
        padding: '0px 5px',
      },
      body: {
        color: 'inherit',
        fontFamily: '"Open Sans", sans-serif',
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '10pt',
        fontWeight: 'bold',
        paddingLeft: '8px',
      },
      head: {
        fontSize: '0.95rem',
        paddingLeft: '8px',
      },
    },
    MUIDataTableToolbar: {
      root: {
        backgroundColor: tableHeader,
        minHeight: '15px',
      },
      titleText: {
        color: tableHeaderFontColor,
        fontSize: '25.2pt',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
      },
    },

    MUIDataTableToolbarSelect: {
      root: {
        backgroundColor: tableHeader,
      },
      titleText: {
        color: tableHeaderFontColor,
        fontSize: '25.2pt',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
      },
    },
    MuiIconButton: {
      root: {
        padding: '5px',
      },
    },
    MuiGrid: {
      container: {
        width: '100% !important',

      },
    },
    MuiSwitch: {
      bar: {
        backgroundColor: '#ABADB0',
      },
    },
    MUIDataTableBodyCell: {
      stackedCommon: {
        height: 'auto !important',
        whiteSpace: 'normal !important',
      },
    },
    MuiPrivateTabIndicator: {
      root: {
        top: 0,
        bottom: 'auto',
        height: '3px',
      },
    },
  },
};
