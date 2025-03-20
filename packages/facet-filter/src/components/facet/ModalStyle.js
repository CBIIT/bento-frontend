import SearchIcon from './assets/Search_Icon.svg';

export default () => ({
  modalBody: {
    position: 'absolute',
    top: '5%',
    left: '25%',
    width: '836px',
    height: '671px',
    background: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchBox: {
    fontSize: '11px',
    fontFamily: 'Nunito',
    width: '222px',
    height: '30px',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '8px',
    background: `url(${SearchIcon}) right 5px center no-repeat`,
  },
  highlight: {
    color: '#b2c6d6',
  },
  sortGroup: {
    paddingTop: '10px',
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    marginLeft: '-5px',
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
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    float: 'right',
    marginRight: '10px',
    marginTop: '5px',
  },
  itemContainer: {
    overflowY: 'scroll',
  },
});
