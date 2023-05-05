export const customTheme = {
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '&.container_header': {
        textAlign: 'right',
      },
      '&.container_footer': {
        paddingTop: '10px',
        textAlign: 'right',
      },
      '&.container_footer_link': {
        textAlign: 'right',
        paddingRight: '100px',
        height: '65px',
        color: '#3E6886',
        fontSize: '12px',
        fontFamily: 'Lato',
        borderBottom: '1px solid #3E6886',
        textDecoration: 'none',
      },
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#fff',
      fontSize: '12px',
      marginTop: '6px',
      fontFamily: 'Lato',
      borderRadius: '10px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      '&.add_all_button': {
        marginRight: '24px',
        // width: '120px',
        backgroundColor: '#142D64',
      },
      '&.add_selected_button': {
        marginRight: '10px',
      },
      '&.add_selected_button_Cases': {
        backgroundColor: '#10A075',
      },
      '&.add_selected_button_Samples': {
        backgroundColor: '#0DAFEC',
      },
      '&.add_selected_button_Files': {
        backgroundColor: '#C92EC7',
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button_Cases': {
          backgroundColor: '#D6F2EA',
        },
        '&.add_selected_button_Samples': {
          backgroundColor: '#CFEDF9',
        },
        '&.add_selected_button_Files': {
          backgroundColor: '#F7D7F7',
        },
      },
      '&.yesBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#98a19e',
      },
      '&.noBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#42779a',
      },
    },
  },
  MuiLink: {
    root: {
      height: '65px',
      color: '#3E6886',
      fontSize: '12px',
      fontFamily: 'Lato',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
    },
  },
  MuiDialog: {
    paper: {
      width: '431px',
      height: '170px',
      borderRadius: '25px !important',
      textAlign: 'center',
      backgroundColor: '#E8DFDC !important',
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
};

export const themeConfig = {
  customTheme,
};
