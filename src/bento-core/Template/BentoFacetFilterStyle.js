export default () => ({
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '9px',
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  floatRight: {
    margin: '7px 0px 7px 6px',
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#638fb5',
    fontSize: 14,
  },
  resetTextDisabled: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#a9b2b9',
    fontSize: 14,
  },
  cases: {
    height: '5px',
  },
  Cases: {
    height: '5px',
    margin: '0px',
    backgroundColor: '#0d8461',
  },
  Samples: {
    height: '5px',
    margin: '0px',
    backgroundColor: '#10beff',
  },
  Files: {
    height: '5px',
    margin: '0px',
    backgroundColor: '#e636e4',
  },
  sectionSummaryText: {
    fontSize: '14px',
    flexShrink: '0',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    lineHeight: '0',
    marginLeft: '10px',
    letterSpacing: '0',
    textTransform: 'uppercase',
  },
  dropDownIconSubSection: {
    marginLeft: '0px',
    fill: '#000000',
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 4,
  },
  sectionSummaryTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight: 300,
    marginLeft: 10,
    color: '#000000',
  },
});
