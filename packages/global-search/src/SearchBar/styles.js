import { makeStyles } from '@material-ui/core';

/**
 * Default styling classes for the SearchBar component
 *
 * @typedef {object}
 */
export const DEFAULT_STYLES = makeStyles({
  root: {
    zIndex: 1501,
    '& .MuiAutocomplete-listbox': {
      borderRadius: '8px',
      fontFamily: 'Lato',
      fontSize: '12px',
      color: '#142D64',
      fontWeight: 500,
      border: '2px solid #4A8ECB',
      padding: '0px',

      '& li': {
        // list item specific styling
        borderBottom: '1px solid #3B68CB',
        '&:nth-last-child(1)': {
          borderBottom: 'none',
          fontSize: '14px',
          color: 'black',
          backgroundColor: '#ECECEC',
          '& :hover': {
            color: 'black',
            backgroundColor: '#ECECEC',
            pointerEvents: 'none',
          },
        },
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#0088FF',
      },
    },
  },
  backdrop: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  autocomplete: {
    margin: '0 auto',
    width: '260px',
    height: '37px',
  },
  enterIcon: {
    height: '12px',
    margin: '0px 18px 0px 6px',
  },
  inputRoot: {
    borderRadius: '8px',
    color: '#4A8ECB',
    fontFamily: 'Lato',
    fontSize: '16px',
    padding: '9.5px 4px 9.5px 6px !important',
  },
  inputAdornedEnd: {
    padding: '0 8px !important',
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#4A8ECB',
        '& legend': {
          visibility: 'hidden',
        },
      },
      '&:hover fieldset': {
        borderColor: '#4A8ECB',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4A8ECB',
      },
    },
  },
  searchIconSpan: {
    color: '#4A8ECB',
    stroke: '#4A8ECB',
    strokeWidth: '1.1px',
    marginRight: '8px',
    cursor: 'pointer',
  },
});

export default DEFAULT_STYLES;
