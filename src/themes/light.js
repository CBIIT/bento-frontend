import tinycolor from 'tinycolor2';

const whisper = '#E7E5E5';
const curiousBlue = '#CBE2EE';
const deepSkyBlue = '#3695A9';
const airForceBlue = '#5E8CA5';
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
const lochmara = '#3478A5';
const lightenRate = 7.5;
const darkenRate = 15;
const tableHeaderBorder = '#4B619A 3px solid';
const tableHeaderFontColor = '#004c73';
const tableFontFamily = "'Lato Regular','Raleway', sans-serif";
const white = '#FFFFFF';

export default {
  custom: {
    maxContentWidth: '1440px',
    maxContent: 'white',
    bodyBackGround: '#f2f2f2',
    cardBackGround: '#f0f6f8',
    fontFamilySans: '"Open Sans", sans-serif',
    footorBackground: '#325068',
    fontFamily: '"Lato Regular","Open Sans", sans-serif',
    fontFamilyRaleway: "'Raleway', sans-serif",
    drawerWidth: '240px',
  },
  palette: {
    primary: {
      main: whisper,
      light: tinycolor(whisper)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(whisper)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#0E273A',
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
      main: '#F3F8FB',
      light: tinycolor(black)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(black)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#3478A5',
      lattice: '#E5F6F8',
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
      default: '#f2f2f2',
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
      tableRoot: {
        transform: 'rotateX(180deg)',
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
        '&$checked': {
          color: '#3695A9',
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
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.06em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
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
    },
    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(even)': {
          color: '#004c73',
        },
        '&:nth-child(odd)': {
          color: '#004c73 !important',
          background: '#f5f5f5 !important',
        },
      },
    },
    MuiTableRow: {
      head: {
        height: 40,
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
        fontFamily: '"Lato Regular","Open Sans", sans-serif',
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
      iconButton: {
        marginRight: '2.8%',
        '@media (max-width: 1600px)': {
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
      },
      select: {
        border: '2px #fff solid',
        background: '#fff',
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
  },
};
