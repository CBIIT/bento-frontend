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
      marginTop: '0px',
      fontFamily: 'Lato',
      borderRadius: '4px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      width: '133px',
      height: '45px',
      '&.okBtn': {
        width: '97px',
        height: '45px',
        cursor: 'pointer',
        background: '#3E74B6',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Roboto',
        marginLeft: '9px',
      },
      '&.cancelBtn': {
        fontSize: '14px',
        fontWeight: '500',
        marginRight: '9px',
        fontFamily: 'Roboto',
        width: '97px',
        height: '45px',
        cursor: 'pointer',
        background: '#4F5D69',
        borderRadius: '10px',
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
      width: '458px',
      height: '233px',
      textAlign: 'center',
      backgroundColor: '#fff',
      border: '2px solid #BA1F40',
      borderRadius: '10px',
    },
  },
  MuiDialogContent: {
    root: {
      display: 'flex',
      flex: 'none',
      padding: '0px',
      justifyContent: 'center',
      alignItems: 'Center',
      '&.alter-content': {
        fontFamily: 'Lato',
        size: '16px',
      },
    },
  },
  MuiDialogContentText: {
    root: {
      color: '#000',
      height: '60px',
      fontWeight: '400',
      marginTop: '20px',
      fontSize: '17px',
      fontFamily: 'Roboto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItem: 'center',
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
