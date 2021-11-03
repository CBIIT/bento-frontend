const styles = () => ({

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
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F5B9C',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F5B9C',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F5B9C',
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
    color: '#000000',
    lineHeight: '120%',
    fontFamily: 'Nunito',
    fontSize: '14px',
  },
  searchBoxRoot: {
    marginLeft: 'Auto',
    marginRight: 'Auto',
    width: '90%',
  },
});

export default styles;
