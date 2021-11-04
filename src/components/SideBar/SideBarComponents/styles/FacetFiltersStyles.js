const styles = () => ({
  expansionPanelRoot: {
    boxShadow: 'none',
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    borderTop: 'thin solid #B1B1B1',
    '&:last-child': {
      borderBottom: '1px solid #B1B1B1',
    },
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  backdrop: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  expansionPanelDetailsRoot: {
    paddingBottom: '8px',
    display: 'unset',
  },
  dropDownIconSubSection: {
    marginLeft: '0px',
    fill: '#000000',
  },
  sectionSummaryText: {
    marginLeft: '-6px',
    color: '#000000',
    fontFamily: 'Open Sans',
    fontWeight: '300',
    fontSize: '20px',
    lineHeight: '26px',
    letterSpacing: 0,
  },
  sectionSummaryTextCase: {
    marginLeft: '-6px',
    color: '#000000',
    fontFamily: 'Open Sans',
    fontWeight: '300',
    fontSize: '20px',
    lineHeight: '26px',
    letterSpacing: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    justifyContent: 'space-between',
  },
  sectionSummaryTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  searchContainer: {
    zIndex: 3,
  },
  subSectionSummaryText: {
    marginLeft: '10px',
    color: '#000000',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
    lineHeight: 0,
    letterSpacing: 0,
    flexShrink: 0,
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 4,
  },
  sortGroup: {
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '42px',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    marginRight: '12px',
    marginLeft: '16px',
  },
  selected: {},
  selectedCheckboxDisplay: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  showMore: {
    float: 'right',
    paddingRight: '5px',
    cursor: 'pointer',
    fontSize: '10px',
  },
  findCaseButton: {
    marginLeft: '55px',
  },
});

export default styles;
