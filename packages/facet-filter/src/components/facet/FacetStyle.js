export default () => ({
  expansionPanelDetailsRoot: {
    display: 'block',
  },
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    borderTop: '1px solid #D2D2D2',
    '&:last-child': {
      borderBottom: '1px solid #D2D2D2',
    },
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  subSectionSummaryText: {
    marginLeft: '10px',
    lineHeight: 0,
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
  },
  sortGroup: {
    paddingTop: '10px',
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    marginLeft: '-4px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: '8px',
  },
  sortGroupSlider: {
    marginBottom: '5px',
    textAlign: 'left',
    marginLeft: '-4px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: '8px',
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
    // marginRight: '32px',
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
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '19px',
    marginLeft: 'auto',
    // marginTop: '5px',
    // float: 'right',
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
});
