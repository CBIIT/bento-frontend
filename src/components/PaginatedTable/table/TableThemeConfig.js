export const pgTopThemeConfig = {
  overrides: {
    MuiTablePagination: {
      root: {
        paddingRight: '20px',
        borderTop: '3px solid #42779a',
        borderBottom: '3px solid #42779a',
      },
    },
    MuiTypography: {
      body2: {
        fontSize: '14px',
        textTransform: 'uppercase',
      },
      root: {
        fontSize: '14px',
      },
    },
    MuiIconButton: {
      root: {
        padding: '2px',
      },
    },
  },
};

export const pgBottomThemeConfig = {
  overrides: {
    MuiTablePagination: {
      root: {
        paddingRight: '20px !important',
        borderTop: '3px solid #42779a',
      },
    },
    MuiTypography: {
      body2: {
        fontSize: '14px',
        textTransform: 'uppercase',
      },
      root: {
        fontSize: '14px',
      },
    },
    MuiIconButton: {
      root: {
        padding: '2px',
      },
    },
  },
};

export const tblHeaderThemeConfig = {
  overrides: {
    MuiTableHead: {
      root: {
        fontWeight: '400',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
      },
    },
    MuiTableCell: {
      root: {
        padding: '0',
        paddingRight: '5px',
        color: '#13344A',
        cursor: 'pointer',
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
        '&.samples_header_col_sample_procurement_method': {
          minWidth: '220px',
        },
        '&.samples_header_col_sample_anatomic_site': {
          minWidth: '180px',
        },
      },
    },
    MuiTableRow: {
      head: {
        height: '40px',
        borderBottom: '3px solid #42779a',
      },
      root: {
      },
    },
  },
};

export const tblBodyThemeConfig = {
  overrides: {
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
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
      },
    },
    MuiTableCell: {
      root: {
        padding: '0',
        paddingRight: '20px',
        color: '#13344A',
        cursor: 'pointer',
      },
    },
    MuiLink: {
      root: {
        color: '#0083c6',
        textDecoration: 'none',
      },
    },
  },
};
