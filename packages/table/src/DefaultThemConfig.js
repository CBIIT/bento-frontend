const defaultTheme = () => ({
  MuiToolbar: {
    root: {
      textAlign: 'right',
      display: 'block',
    },
  },
  MuiPopover: {
    paper: {
      padding: '16px 5px 16px 10px',
    },
  },
  MuiTypography: {
    root: {
      '&.viewColumnText': {
        paddingLeft: '10px',
        color: '#0B3556',
        fontSize: '14px',
        textAlign: 'right',
        fontWeight: '500',
      },
    },
  },
  MuiList: {
    root: {
      '&.viewColumnList': {
        padding: '8px 20px 8px 20px',
      },
    },
  },
  MuiListItem: {
    root: {
      '&.viewColumnListItem': {
        padding: '0',
      },
    },
  },
  MuiIconButton: {
    root: {
      '&.closeIcon': {
        float: 'right',
        padding: '0',
      },
    },
  },
  MuiCheckbox: {
    root: {
      '&.checkBox': {
        padding: '5px 5px 5px 0px',
      },
    },
  },
  MuiSvgIcon: {
    root: {
      '&.checkBoxIcon': {
        color: '#0B3556',
      },
    },
  },
});

export default defaultTheme;
