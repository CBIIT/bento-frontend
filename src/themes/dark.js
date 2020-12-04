import tinycolor from 'tinycolor2';

const whisper = '#E7E5E5';
const midNightBlue = '#142D64';
const curiousBlue = '#CBE2EE';
const deepSkyBlue = '#8DCAFF';
const airForceBlue = '#5E8CA5';
const neonBlue = '#5D53F6';
const qQhite = '#EEEEEE';
const orange = '#FF7F15';
const green = '#2FA000';
const dodgeBlue = '#0296C9';
const cobolt = '#FBB35D';
const warning = '#ff7f0b';
const success = '#3CD4A0';
const info = '#3f2b2f';
const tableHeader = '#ffffff';
const black = 'black';
const lochmara = '#B7C5CF';
const lightenRate = 7.5;
const darkenRate = 15;
const tableHeaderBorder = '#42779A 3px solid';
const tableHeaderFontColor = '#13344A';
const tableFontFamily = "'Lato Regular','Raleway', sans-serif";
const white = '#FFFFFF';

export default {
  custom: {
    maxContentWidth: '1440px',
    maxContent: 'white',
    bodyBackGround: '#E5F0FA',
    cardBackGround: '#f0f6f8',
    fontFamilySans: '"Open Sans", sans-serif',
    footorBackground: '#325068',
    fontFamily: 'Lato,"Open Sans", sans-serif',
    fontFamilyRaleway: "'Raleway', sans-serif",
    drawerWidth: '240px',
    widgetDivider: '#181918',
  },
  palette: {
    primary: {
      main: midNightBlue,
      light: tinycolor(midNightBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(midNightBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: deepSkyBlue,
      light: tinycolor(deepSkyBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(deepSkyBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#0E273A',
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
    neonBlue: {
      main: neonBlue,
      light: tinycolor(curiousBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(curiousBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    deepSkyBlue: {
      main: deepSkyBlue,
      light: tinycolor(deepSkyBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(deepSkyBlue)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    lochmara: {
      main: lochmara,
      light: tinycolor(lochmara)
        .lighten(lochmara)
        .toHexString(),
      dark: tinycolor(lochmara)
        .darken(darkenRate)
        .toHexString(),
      contrastText: 'lochmara',
      contrastTextColor: '#3478A5',
    },
    white: {
      main: white,
      light: tinycolor(white)
        .lighten(white)
        .toHexString(),
      dark: tinycolor(white)
        .darken(white)
        .toHexString(),
      contrastText: 'white',
    },
    airForceBlue: {
      main: airForceBlue,
      light: tinycolor(airForceBlue)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(whisper)
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
      main: '#3A3B3B',
      light: tinycolor(black)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(black)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#CBCACA',
      contrastSwicthColor: '#60479D',
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
      footerText: 'white',
    },
    background: {
      default: '#E5F0FA',
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
    MuiListItemText: {
      root: {
        padding: '0 8px',
        '&:first-child': {
          wordBreak: 'break-word',
        },
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
    MUIDataTable: {
      responsiveStacked: {
        transform: 'rotateX(180deg)',
      },
      responsiveBase: {
        transform: 'rotateX(180deg)',
      },
      tableRoot: {
        transform: 'rotateX(180deg)',
        borderTop: '3px solid #e7e5e5',
      },
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        position: 'relative',
      },
      headerCell: {
        borderBottom: '3px solid #42779A',
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,

      },
      checkboxRoot: {
        color: 'inherit',
        '&$checked': {
          color: '#8DCAFF',
        },
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
      fixedHeader: {
        position: 'relative',
        borderTop: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.06em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
        paddingLeft: '20px',
        '&:first-child': {
          paddingLeft: '30px',
        },
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
      icon: {
        marginTop: '12px',
      },
    },
    MUIDataTableBodyRow: {
      root: {
        backgroundColor: 'transparent !important',
        '&:nth-child(even)': {
          color: '#004C73',
        },
        '&:nth-child(odd)': {
          color: '#004C73 !important',
          background: '#f3f3f3 !important',
        },
      },
    },
    MUIDataTableFooter: {
      root: {
        borderBottom: '3px solid #e7e5e5',
        borderTop: '5px solid #e7e5e5',
      },
    },
    MuiTableRow: {
      head: {
        height: 40,
        borderBottom: '3px solid #42779A',
      },
      root: {
        height: 40,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
        padding: '5px',
      },
      paddingCheckbox: {
        padding: '0px 5px',
      },
      body: {
        color: 'inherit',
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '16px',
        fontFamily: 'Nunito',
        fontWeight: 'normal',
        paddingLeft: '20px',
      },
      head: {
        fontSize: '0.95rem',
        paddingLeft: '8px',
      },
    },
    MUIDataTableToolbar: {
      root: {
        backgroundColor: tableHeader,
      },
      titleText: {

        color: tableHeaderFontColor,
        // fontSize: '25.2pt',
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
      iconButton: {
        marginRight: '0.3%',
        '@media (max-width: 2560px)': {
          marginRight: '0.5%',
        },
        '@media (max-width: 2000px)': {
          marginRight: '0.7%',
        },
        '@media (max-width: 1600px)': {
          marginRight: '0.9%',
        },
        '@media (max-width: 1300px)': {
          marginRight: '1.1%',
        },
        '@media (max-width: 1024px)': {
          marginRight: '1.3%',
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: '5px',
      },
    },
    MuiTablePagination: {
      toolbar: {
        textTransform: 'uppercase',
        marginTop: '-11px',
      },
      select: {
        border: '2px #fff solid',
        background: '#fff',
      },
      caption: {
        color: '#000000',
        fontFamily: 'Open Sans',
        fontSize: '10px',
      },
      actions: {
        marginRight: '39px',
      },
    },
    MuiSwitch: {
      bar: {
        backgroundColor: '#ABADB0',
      },
    },
    MuiTableFooter: {
      root: {
        borderTop: '6px #E7E5E5 solid',
      },
    },
    MUIDataTableBodyCell: {
      stackedParent: {
        '&:first-child': {
          paddingLeft: '30px',
        },
      },
    },
    MuiExpansionPanel: {
      root: {
        '&$expanded': {
          margin: 'unset',
        },
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        '&:first-child': {
          color: '#000000',
        },
      },
    },
  },
};
