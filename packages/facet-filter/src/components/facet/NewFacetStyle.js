export default () => ({
  expansionPanelDetailsRoot: {
    display: 'block',
  },
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    marginTop: '8px',
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  subSectionSummaryText: {
    marginLeft: '10px',
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
  },
  sortGroup: {
    paddingTop: '10px',
    marginBottom: '5px',
    textAlign: 'left',
    marginLeft: '-5px',
    borderTop: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '12px',
    marginLeft: '24px',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '32px',
  },
  NonSortGroup: {
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    paddingLeft: '10px',
  },
  NonSortGroupItem: {
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '32px',
  },
  sortGroupItemCounts: {
    marginLeft: 'auto',
    marginRight: '15px',
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
  },
  highlight: {
    color: '#b2c6d6',
  },
  showMore: {
    textAlign: 'right',
    paddingRight: '5px',
    cursor: 'pointer',
    fontSize: '10px',
    width: '100%',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  searchBox: {
    fontSize: '14px',
    fontFamily: 'Nunito',
    width: 'calc(100% - 26px)',
    height: '30px',
    marginTop: '12px',
    borderRadius: '5px',
    marginLeft: '6px',
    border: '1px solid',
    padding: '5px',
  },
  searchBoxWithText: {
    fontSize: '14px',
    fontFamily: 'Nunito',
    width: 'calc(100% - 26px)',
    height: '30px',
    marginTop: '12px',
    borderRadius: '5px',
    marginLeft: '6px',
    border: '1px solid',
    padding: '5px',
  },
  expandedDisplayButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4D889E !important',
    color: 'white',
    width: 'calc(100% - 26px)',
    height: '30px',
    marginBottom: '5px',
    marginLeft: '6px',
    padding: '6px 11px',
    borderRadius: '5px',
    fontFamily: 'Nunito',
    fontSize: '11px',
    fontWeight: '600',
    top: '8px',
  },
  expandedDisplayCount: {
    marginLeft: '4px',
    fontFamily: 'Nunito',
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '17px',
    color: '#ffffff',
    backgroundColor: '#5D98AE',
    padding: '1px 2px',
  },
  clearTextButton: {
    padding: '0px',
    height: '20px',
    position: 'absolute',
    right: '14px',
    top: '16px',
  },
  timeUnitToggle: {
    marginLeft: '8px',
    marginRight: '20px',
    height: '32px',
    '& .MuiToggleButtonGroup-grouped': {
      borderRadius: '8px',
      '&:not(:first-child)': {
        marginLeft: '0px',
        borderLeft: '1px solid #D3D3D3',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
      },
      '&:not(:last-child)': {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
      },
    },
  },
  toggleButton: (props) => {
    const primaryColor = (props.facet && props.facet.style && props.facet.style.colorPrimary)
      ? props.facet.style.colorPrimary.color
      : '#3f51b5';

    const defaultStyles = {
      fontFamily: 'Poppins !important',
      fontSize: '11px !important',
      fontWeight: '400 !important',
      fontStyle: 'normal !important',
      lineHeight: '100% !important',
      letterSpacing: '0.02em !important',
      padding: '6px 24px',
      textTransform: 'uppercase !important',
      border: '1px solid #D3D3D3',
      borderRadius: '8px',
      backgroundColor: '#EDEDED',
      color: '#000000',
      '& .MuiToggleButton-label': {
        fontFamily: 'Poppins !important',
        fontSize: '11px !important',
        fontWeight: '400 !important',
        lineHeight: '100% !important',
        letterSpacing: '0.02em !important',
        textTransform: 'uppercase !important',
      },
      '&:hover': {
        backgroundColor: '#E0E0E0',
      },
      '&.Mui-disabled': {
        backgroundColor: '#F5F5F5',
        color: '#BDBDBD',
        border: '1px solid #E0E0E0',
        cursor: 'not-allowed',
        '& .MuiToggleButton-label': {
          color: '#BDBDBD',
        },
      },
      '&.Mui-selected': {
        backgroundColor: primaryColor,
        color: '#FFFFFF',
        '& .MuiToggleButton-label': {
          fontFamily: 'Poppins !important',
          fontSize: '11px !important',
          fontWeight: '400 !important',
          lineHeight: '100% !important',
          letterSpacing: '0.02em !important',
          textTransform: 'uppercase !important',
        },
        '&:hover': {
          backgroundColor: primaryColor,
        },
      },
    };

    // Merge custom styles with defaults
    return props.facet.style && props.facet.style.toggleButton
      ? { ...defaultStyles, ...props.facet.style.toggleButton }
      : defaultStyles;
  },
  toggleButtonSelected: (props) => {
    const primaryColor = (props.facet && props.facet.style && props.facet.style.colorPrimary)
      ? props.facet.style.colorPrimary.color
      : '#3f51b5';

    const defaultStyles = {
      backgroundColor: primaryColor,
      color: '#FFFFFF !important',
      '&:hover': {
        backgroundColor: primaryColor,
      },
    };

    // Merge custom styles with defaults
    return props.facet.style && props.facet.style.toggleButtonSelected
      ? { ...defaultStyles, ...props.facet.style.toggleButtonSelected }
      : defaultStyles;
  },
});
