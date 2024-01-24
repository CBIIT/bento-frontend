/**
 * Generate the default styling for the component
 */
export default () => ({
  queryWrapper: {
    height: '120px',
    backgroundColor: '#f1f1f1',
    padding: '14px 14px 0px 35px',
    overflowY: 'auto',
  },
  queryContainer: {
    marginLeft: 7,
    position: 'relative',
    lineHeight: '2.4em',
    letterSpacing: '0.5px',
    fontFamily: 'Nunito',
    fontSize: '14px',
    color: '#0e3151',
  },
  filterName: {
    textTransform: 'uppercase',
    padding: '5px 6px 5px 7px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  filterCheckboxes: {
    padding: '4px 7px 3px 6px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    border: '0.75px solid #898989',
    width: 'fit-content',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  bracketsOpen: {
    fontSize: 18,
    fontFamily: 'Nunito Sans Semibold',
    color: '#787878',
    marginRight: 3,
    fontWeight: 600,
  },
  bracketsClose: {
    fontSize: 18,
    fontFamily: 'Nunito Sans Semibold',
    color: '#787878',
    marginLeft: 3,
    fontWeight: 600,
  },
  operators: {
    color: '#646464',
    marginLeft: '3px',
    marginRight: '3px',
    borderBottom: 'none',
    textDecoration: 'none',
    fontSize: 10,
    fontWeight: 'bold',
  },
  clearQueryButton: {
    margin: '1px',
    marginLeft: -6,
    fontWeight: 600,
    fontSize: '13px',
    color: '#fff',
    borderRadius: '15px',
    fontFamily: 'Nunito',
    boxSizing: 'border-box',
    backgroundColor: '#969696',
    textTransform: 'capitalize',
    border: '1px solid #B4B4B4',
    padding: '1px 5px 0px 6px',
    '&:hover': {
      backgroundColor: '#969696',
    },
  },
  divider: {
    borderRight: '2px solid #969696',
    marginLeft: 7,
  },
  /* Custom Styling by Project */
  localFind: {
    color: '#10A075',
  },
  localFindBackground: {
    backgroundColor: '#C0E9D7',
  },
  facetSectionCases: {
    color: '#10A075',
  },
  facetSectionCasesBackground: {
    backgroundColor: '#C0E9D7',
  },
  facetSectionFiles: {
    color: '#E636E4',
  },
  facetSectionFilesBackground: {
    backgroundColor: '#F5C3F1',
  },
  facetSectionSamples: {
    color: '#10BEFF',
  },
  facetSectionSamplesBackground: {
    backgroundColor: '#C3EAF5',
  },
  expandBtn: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  collapseBtn: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  urlContainer: {
    marginTop: '10px',
    minHeight: '10px',
    marginBottom: '10px',
  },
  link: {
    lineBreak: 'anywhere',
    overflow: 'hidden',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0em',
    padding: '5px',
    borderRadius: '5px',
    float: 'left',
    color: '#1D79A8',
    backgroundColor: '#fff',
    maxWidth: '80%',
  },
  viewLink: {
    margin: '0',
  },
  collapseLink: {
    maxHeight: '1em',
    display: 'block',
    // display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '1',
    overflow: 'hidden',
  },
  expandLink: {
    cursor: 'pointer',
  },
  expandLinkBtn: {
    float: 'left',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  viewLinkToggleBtn: {
    height: '20px',
    marginRight: '10px',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0em',
    textAlign: 'left',
    backgroundColor: '#1D79A8',
    textTransform: 'none',
    color: '#fff',
    float: 'left',
    '&:hover': {
      backgroundColor: '#1D79A8',
      color: '#fff',
    },
  },
  urlView: {
    float: 'left',
    width: 'calc(100% - 13px)',
    minWidth: '840px',
    '@media (max-width: 2560px)': {
      maxWidth: '1800px',
    },
    '@media (max-width: 2000px)': {
      maxWidth: '1400px',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '1200px',
    },
    '@media (max-width: 1300px)': {
      maxWidth: '1050px',
    },
  },
  copyIconBtn: {
    padding: '0px',
    marginLeft: '10px',
    float: 'left',
  },
  dialogBox: {
    '& div.MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    '& div.MuiPaper-root': {
      borderRadius: '20px',
      border: '2px solid #1D79A8',
      width: '430px',
      backgroundColor: '#E8EFEF',
      padding: '20px 0px 30px 0px',
      '& .MuiDialogContent-root': {
        fontFamily: 'Nunito',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '20px',
        textAlign: 'center',
        '& .MuiTypography-colorTextSecondary': {
          color: '#000000',
        },
      },
      '& .MuiDialogActions-root': {
        '& button': {
          width: '125px',
          height: '38px',
          borderRadius: '8px',
          border: '1px solid #1A8CCB',
          backgroundColor: '#1A8CCB',
          color: '#fff',
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '16px',
          margin: 'auto',
        },
      },
    },
  },
});
