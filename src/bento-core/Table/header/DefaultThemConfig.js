const defaultTheme = () => ({
  MuiTableHead: {
    root: {
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0.00938em',
    },
  },
  MuiTableCell: {
    root: {
      padding: '0',
      paddingRight: '5px',
      color: '#13344A',
      cursor: 'pointer',
    },
  },
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'underline',
      '&:hover': {
        pointerEvents: 'none',
      },
    },
  },
  MuiButtonBase: {
    root: {
      color: '#13344A !important',
    },
  },
  MuiTableRow: {
    head: {
      height: '40px',
      borderBottom: '3px solid #42779a',
      borderTop: '3px solid #42779a',
    },
  },
  MuiTypography: {
    root: {
      '&.del_all_row_text': {
        lineHeight: '37px',
        float: 'left',
        color: '#A61401',
        fontSize: '11pt',
        textAlign: 'center',
        fontFamily: 'Lato Regular, Raleway, sans-serif',
      },
    },
  },
  MuiSvgIcon: {
    root: {
      '&.del_all_row_btn_icon': {
        color: '#A61401',
      },
    },
  },
});

export default defaultTheme;
