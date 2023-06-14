const defaultTheme = () => ({
  MuiTableHead: {
    root: {
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0.00938em',
    },
  },
  MuiCheckbox: {
    colorPrimary: {
      color: '#13344A',
      marginLeft: '12px',
      '&.Mui-checked': {
        color: '#13344A',
      },
    },
  },
  MuiTableCell: {
    root: {
      padding: '0px 5px 0px 20px',
      color: '#13344A',
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
        color: 'red',
      },
      '&:focus': {
        pointerEvents: 'none',
        color: '#13344A',
      },
    },
  },
  MuiButtonBase: {
    root: {
      color: '#13344A',
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#fff',
      fontSize: '0.875rem',
      marginTop: '6px',
      fontFamily: 'Lato',
      borderRadius: '4px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      width: '133px',
      height: '45px',
      '&.okBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#98a19e',
      },
      '&.cancelBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#42779a',
      },
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
      '&.remove_all_tooltip': {
        zIndex: '1000',
        border: '2px solid #A61401',
        background: '#fff',
        fontSize: '12px',
        width: '110px',
        height: '48px',
        fontWeight: '500',
        color: '#A61401',
        borderRadius: '7px',
        padding: '5px 10px',
        textAlign: 'center',
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
  MuiTooltip: {
    tooltipPlacementBottom: {
      margin: '0px 0px 20px 0px',
      '@media (min-width: 600px)': {
        margin: '0px 0px 20px 0px',
      },
    },
    tooltip: {
      // backgroundColor: 'none',
    },
  },
  MuiDialog: {
    paper: {
      width: '431px',
      height: '170px',
      borderRadius: '25px',
      textAlign: 'center',
      backgroundColor: '#E8DFDC',
      border: '2px solid #A61401',
    },
  },
  MuiDialogContent: {
    root: {
      padding: '40px 20px 0px 20px',
      '&.alter-content': {
        fontFamily: 'Lato',
        size: '16px',
      },
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'center',
      paddingBottom: '25px',
    },
  },
});

export default defaultTheme;
