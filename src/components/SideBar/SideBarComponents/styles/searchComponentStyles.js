const styles = () => ({
  listPadding: {
    paddingTop: '0px',
    paddingBottom: '4px',
  },
  backdrop: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  clearFiltersBorder: {
    borderTop: '1px solid black',
    borderBottom: '1px solid #B0CFE1',
  },
  inputRoot: {
    borderRadius: 10,
    marginTop: '5px',
    marginBottom: '5px',
    boxSizing: 'border-box',
    height: 32,
    width: 200,
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1.25px solid #0D8461',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1.25px solid #0D8461',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1.25px solid #0D8461',
    },
    '& .MuiInputBase-input': {
      height: '7px',
    },
  },
  closeRoot: {
    marginLeft: '3px',
    height: 18,
  },
  listItemGutters: {
    padding: '2px 0px 2px 0px',
  },
  searchResultDetailText: {
    marginTop: '1.5px',
    marginLeft: 10,
    color: '#0D8662',
    lineHeight: '120%',
    fontFamily: 'Nunito',
    fontSize: '14px',
  },
  searchBoxRoot: {
    marginRight: 'Auto',
    width: '90%',
  },
});

export default styles;
