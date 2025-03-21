export default () => ({
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
    marginLeft: '16px',
  },
  sortGroupItem: {
    cursor: 'pointer',
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
  itemsContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderTop: '2px solid #AEAEAE',
    borderBottom: '2px solid #AEAEAE',
    marginRight: '-1px',
    '&::-webkit-scrollbar': {
      width: '12px',
      backgroundColor: '#E9F0F4',
      borderLeft: '0.5px solid #B1B1B1',
      borderRight: '0.5px solid #B1B1B1',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#CECECE',
      border: '3px solid transparent',
      borderRadius: '20px',
      backgroundClip: 'content-box',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#477C90',
      border: '3px solid transparent',
      borderRadius: '20px',
      backgroundClip: 'content-box',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
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
