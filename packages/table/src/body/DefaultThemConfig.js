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
      minHeight: '45px',
      padding: '0',
      paddingRight: '20px',
      color: '#004C73',
      cursor: 'pointer',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 5px',
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
  MuiButtonBase: {
    root: {
      '&.del_row_btn': {
        width: '29px',
        border: '1px solid #ccc',
        margin: '10px 10px 10px 10px',
        cursor: 'pointer',
        height: '26px',
        padding: '0',
        background: '#fff',
        borderRadius: '15%',
      },
    },
  },
  MuiSvgIcon: {
    root: {
      '&.del_row_btn_icon': {
      },
    },
  },
});

export default defaultTheme;
