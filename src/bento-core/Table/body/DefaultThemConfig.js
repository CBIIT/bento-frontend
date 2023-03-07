const defaultTheme = () => ({
  MuiTableRow: {
    head: {
      height: '40px',
      borderBottom: '3px solid #42779a',
    },
    root: {
      '&:nth-child(even)': {
        background: '#f4f5f5',
      },
    },
  },
  MuiTableHead: {
    root: {
      fontWeight: '400',
      lineHeight: '2',
      fontSize: '16px',
      fontStyle: 'normal',
      fontFamily: 'Nunito',
      letterSpacing: '0.0025em',
    },
  },
  MuiTableCell: {
    root: {
      padding: '0',
      paddingRight: '20px',
      color: '#004C73',
      cursor: 'pointer',
    },
    body: {
      color: '#004C73',
    },
  },
  MuiLink: {
    root: {
      textDecoration: 'none',
      color: '#0083c6',
    },
  },
  MuiCheckbox: {
    colorSecondary: {
      '&.Mui-checked': {
        color: '#8DCAFF',
      },
    },
    root: {
      color: '#142D64',
      '&:hover': {
        background: 'none',
      },
    },
  },
});

export default defaultTheme;
