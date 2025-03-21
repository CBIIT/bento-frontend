import SearchIcon from './assets/Search_Icon.svg';

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
    textAlign: 'left',
    marginLeft: '-5px',
    borderTop: 'none',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '12px',
    marginLeft: '16px',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '11px',
    marginRight: '31px',
  },
  NonSortGroup: {
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    paddingLeft: '10px',
  },
  NonSortGroupItem: {
    fontFamily: 'Nunito',
    fontSize: '11px',
    marginRight: '31px',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '11px',
    float: 'right',
    marginRight: '10px',
    marginTop: '5px',
  },
  highlight: {
    color: '#537A9D',
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
  },
  searchBox: {
    fontSize: '11px',
    fontFamily: 'Nunito',
    width: '245px',
    height: '24px',
    marginTop: '12px',
    marginBottom: '5px',
    borderRadius: '8px',
    background: `url(${SearchIcon}) right 5px center no-repeat`,
    marginLeft: '6px',
    border: '1px solid',
    padding: '5px',
  },
  expandedDisplayButton: {
    background: '#4D889E',
    color: 'white',
    width: '222px',
    height: '30px',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '8px',
    fontSize: '11px',
  },
});
