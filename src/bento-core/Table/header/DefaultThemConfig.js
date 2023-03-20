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
});

export default defaultTheme;
