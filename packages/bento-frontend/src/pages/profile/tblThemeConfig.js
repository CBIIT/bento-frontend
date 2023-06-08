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
      paddingLeft: '30px',
      '&:hover': {
        color: '#13344A',
      },
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

export const tblBody = {
  MuiTableCell: {
    root: {
      color: '#004C73',
      fontSize: '16px',
      fontStyle: 'normal',
      fontFamily: 'Nunito',
      fontWeight: 'normal',
      padding: '5px 0px 5px 50px',
      letterSpacing: '0.025em',
      borderBottom: 'none',
    },
    body: {
      color: '#004C73',
    }
  },
};
  
export const tblPgn = {
  MuiTablePagination: {
    root: {
      fontSize: '10px',
      borderTop: '5px solid #e7e5e5',
      borderBottom: '3px solid #e7e5e5',
      textTransform: 'uppercase',
    },
    input: {
      fontSize: '14px',
    },
    toolbar: {
      minHeight: '45px',
      paddingRight: '60px',
    },
  },
  MuiTypography: {
    body2: {
      fontSize: '10px',
    }
  }
};
  
export const themeConfig = {
  tblHeader,
  tblContainer,
  tblBody,
  tblPgn
};
