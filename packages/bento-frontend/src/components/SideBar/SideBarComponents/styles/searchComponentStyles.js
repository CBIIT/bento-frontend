const styles = () => ({
  listPadding: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  backdrop: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  clearFiltersBorder: {
    borderTop: '1px solid black',
    borderBottom: '1px solid #B0CFE1',
  },
  clearIndicatorDirty: {
    right: '-2px',
  },
  noOptions: {
    color: '#fff',
  },
  paper: {
    border: '1.25px solid #0D8461',
    backgroundColor: '#717171',
    color: '#fff',
    borderRadius: 10,
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: 500,
    boxShadow: '0 0 0 2px rgba(16,160,117,0.36)',
    '& ::-webkit-scrollbar': {
      width: '0.6em',
      height: '1em',
    },
    '& ::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'none',
      borderRadius: '0px',
      backgroundColor: 'transparent',
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#000',
      borderRadius: '0px',
    },
    '& .MuiAutocomplete-listbox': {
      height: 223,
      paddingTop: '0px',
      '& li': {
        // list item specific styling
        borderBottom: '1px solid #fff',
        '&:nth-last-child(1)': {
          borderBottom: 'none',
        },
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#10A075',
      },
    },
  },
  deleteIcon: {
    cursor: 'pointer',
    marginTop: -4,
  },
  inputRoot: {
    borderRadius: 10,
    marginBottom: '7px',
    boxSizing: 'border-box',
    height: 32,
    width: '100%',
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
      color: '#555555',
      fontFamily: 'Lato',
      fontSize: 11,
    },
  },
  closeRoot: {
    height: 10,
  },
  listItemGutters: {
    padding: '0px 15px 0px 18px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchResultDetailText: {
    color: '#0D8662',
    lineHeight: '20px',
    fontFamily: 'Lato',
    fontSize: '11px',
    fontStyle: 'italic',
  },
  searchBoxRoot: {
    width: '100%',
  },
});

export default styles;
