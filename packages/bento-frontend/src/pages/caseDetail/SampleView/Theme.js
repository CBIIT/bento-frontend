export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#13344A',
      },
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      paddingRight: '50px',
      borderTop: '5px solid #e7e5e5',
      borderBottom: '3px solid #e7e5e5',
    },
    toolbar: {
      minHeight: '45px',
    },
    input: {
      background: '#fff',
    },
  },
};

export const tblContainer = {
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'auto',
      transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
    }
  },
  MuiTable: {
    root: {
      transform: 'rotateX(180deg)',
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
    },
  },
};

export const themeConfig = {
  tblHeader,
  tblPgn,
  tblContainer,
};

/**
* wrapper theme config
*/
export const wrapperThemConfig = {
  MuiContainer: {
    root: {
      textAlign: 'right',
      paddingTop: '14px',
    },
  },
  MuiButton: {
    root: {
      width: '156px',
      lineHeight: '30px',
      fontSize: '12px',
      marginTop: '6px',
      marginBottom: '10px',
      marginRight: '4px',
      marginLeft: '5px',
      color: '#fff',
      fontFamily: 'Lato',
      borderRadius: '10px',
      textTransform: 'uppercase',
      '&.add_selected_button': {
        backgroundColor: '#10a075',
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button': {
          backgroundColor: '#10a075',
          opacity: '0.3',
        },
      },
    },
  },
};
