const theme = {
  overrides: {
    MuiContainer: {
      maxWidthXl: {
        '@media (min-width: 1920px)': {
          maxWidth: '100%',
        },
      },
      root: {
        '&.icdc_query_bar': {
          padding: '0px 0px 1px 0px',
          '& .filter-by-cases': {
            // borderLeft: '2px solid',
          },
          '& .filter-by-samples': {
            // color: '#9dc1d9',
          },
          '& .filter-by-files': {
            // color: '#667a87',
          },
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#ffffff',
        color: '#1c2023',
        maxWidth: '220px',
        fontSize: '0.75rem',
        border: '2px solid #a7afb3',
        fontFamily: 'Open Sans',
        fontWeight: '600',
        textAlign: 'left',
        lineHeight: '1.6',
        padding: '5px 12px',
        borderRadius: '0px',
      },
      arrow: {
        color: '#ffffff',
        marginTop: '-0.71em',
        marginLeft: '0px',
        marginRight: '4px',
        fontSize: '1.25rem',
        '&:before': {
          border: '2px solid #a7afb3',
        },
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        borderRadius: '20px',
        padding: '20px 0px 30px 0px',
      },
    },
    MuiDialogContent: {
      root: {
        textAlign: 'center',
        '& p': {
          fontFamily: 'Nunito',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '20px',
          color: '#000000',
        },
      },
    },
    MuiDialogActions: {
      root: {
        width: '125px',
        height: '38px',
        borderRadius: '8px',
        border: '1px solid #1A8CCB',
        margin: 'auto',
        padding: '0',
        backgroundColor: '#1A8CCB',
      },
    },
    MuiButton: {
      root: {
        color: '#fff',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '16px',
        minWidth: '100px',
        margin: 'auto',
        backgroundColor: '#1A8CCB',
        '&:hover': {
          backgroundColor: '#1A8CCB',
        },
      },
    },
    MuiPaper: {
      root: {
        border: '2px solid #1D79A8',
        width: '430px',
        backgroundColor: '#E8EFEF',
        padding: '20px 0px 30px 0px',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
};

export default theme;
