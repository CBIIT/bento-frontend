/**
 * SearchBox styles
 */
export default () => ({
  backdrop: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  noOptions: {
    color: '#fff',
  },
  listbox: {
    height: 223,
    paddingTop: '0px',
    '& li': {
      borderBottom: '1px solid #fff',
      '&:nth-last-child(1)': {
        borderBottom: 'none',
      },
    },
    '& :hover': {
      color: 'white',
      backgroundColor: '#10A075;',
    },
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
  },
  autocomplete: {
    marginBottom: '7px',
    boxSizing: 'border-box',
    width: '100%',
  },
  inputRoot: {
    borderRadius: 10,
    height: 32,
    color: '#555555',
    fontFamily: 'Lato',
    fontSize: 11,
    paddingLeft: 12,
    paddingRight: 35,
    backgroundColor: '#fff',
    '& input': {
      height: '7px',
      fontSize: 11,
      paddingLeft: '12px !important',
    },
    '& fieldset': {
      borderWidth: '1.25px !important',
      borderColor: '#0D8461 !important',
    },
  },
  searchBoxRoot: {
    width: '100%',
  },
  /* Searchlist styles */
  listPadding: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  deleteIcon: {
    cursor: 'pointer',
  },
  closeRoot: {
    height: 10,
  },
  listItemGutters: {
    padding: '0px 15px !important',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchResultDetailText: {
    color: '#0D8662',
    lineHeight: '20px',
    fontFamily: 'Lato',
    fontSize: '11px',
    fontStyle: 'italic',
  },
  divider: {
    backgroundColor: '#B1B1B1',
    height: '1px',
    marginRight: 11,
    marginLeft: 12,
  },
}
);
