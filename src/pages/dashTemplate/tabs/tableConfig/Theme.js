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
      '&.samples_header_col_sample_procurement_method': {
        minWidth: '180px',
      },
      '&.samples_header_col_sample_anatomic_site': {
        minWidth: '140px',
      },
      '&.samples_header_col_subject_id': {
        minWidth: '100px',
      },
      '&.samples_header_col_sample_id': {
        minWidth: '100px',
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

export const themeConfig = {
  tblHeader,
  tblPgn,
};
