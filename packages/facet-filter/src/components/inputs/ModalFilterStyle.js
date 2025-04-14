export default () => ({
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
  highlight: {
    color: '#b2c6d6',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '11px',
    marginRight: '12px',
    marginLeft: 'auto',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '11px',
    fontWeight: '400',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '11px',
    fontWeight: '400',
    marginRight: '18px',
    marginLeft: 'auto',
  },
  checkboxContainer: {
    height: '528px',
  },
  checkedContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '200px',
    '&>*:nth-child(-n+3)': {
      borderTop: '0.5px solid #000000',
    },
    '&>*:nth-last-child(-n+3)': {
      borderBottom: '0px',
    },
    '&::-webkit-scrollbar': {
      width: '16px',
      backgroundColor: '#E2E2E2',
      borderLeft: '0.5px solid #1E1E1E',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#E2E2E2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4D889E',
    },
  },
  itemsContainer: {
    maxHeight: '528px',
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderTop: '2px solid #AEAEAE',
    borderBottom: '2px solid #AEAEAE',
    '&>*:nth-last-child(-n+3)': {
      borderBottom: '0px',
    },
    '&::-webkit-scrollbar': {
      width: '16px',
      backgroundColor: '#E2E2E2',
      borderLeft: '0.5px solid #1E1E1E',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#E2E2E2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4D889E',
    },
  },
  sortingContainer: {
    display: 'flex',
    height: '36px',
    alignItems: 'center',
    color: '#646464',
  },
  selectionText: {
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '17px',
    color: '#7D267E',
    marginLeft: '20px',
  },
  totalText: {
    fontFamily: 'Nunito',
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '17px',
    color: '#7D267E',
  },
  emptyItem: {
    width: '33.33%',
    borderRight: '0.5px solid #000000',
    borderBottom: '0.5px solid #000000',
  },
});
