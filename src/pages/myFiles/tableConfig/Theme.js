export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'underline',
    },
  },
  MuiTooltip: {
    tooltipPlacementBottom: {
      marginTop: '-10px',
      '@media (min-width: 600px)': {
        marginTop: '-10px',
        marginLeft: '-20px',
      },
    },
    tooltip: {
      backgroundColor: 'none',
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
  },
};

export const tblBody = {
  MuiTableBody: {
    root: {
      margin: 'auto 3% auto 3%',
      maxWidth: '100%',
    },
  },
};

export const themeConfig = {
  tblHeader,
  tblPgn,
  tblBody,
};
