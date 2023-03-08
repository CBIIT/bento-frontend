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

export const themeConfig = {
  tblHeader,
};
