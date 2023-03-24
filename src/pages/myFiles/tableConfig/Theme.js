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
  MuiTableCell: {
    root: {
      padding: '0px 0px 0px 25px',
      paddingRight: '5px',
      color: '#13344A',
      cursor: 'pointer',
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
  MuiIconButton: {
    root: {
      '&.del_all_row_btn': {
        paddingLeft: '5px',
      },
    },
  },
  MuiTypography: {
    root: {
      color: '#A61401',
      '&.remove_all_tooltip': {
        width: '110px',
        border: '2px solid #A61401',
        height: '48px',
        padding: '5px 10px',
        fontSize: '12px',
        background: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: '7px',
      },
      '&.del_all_row_text': {
        float: 'left',
        fontSize: '11pt',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Lato Regular, Raleway, sans-serif',
        lineHeight: '47px',
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
  },
};

export const tblBody = {
  MuiTableBody: {
    root: {
      margin: 'auto 3% auto 3%',
      maxWidth: '100%',
    },
  },
  MuiTableCell: {
    root: {
      minHeight: '45px',
      padding: '0px 0px 0px 25px',
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
};

export const themeConfig = {
  tblHeader,
  tblPgn,
  tblBody,
};
