# Overview

This component provides a Bento-oriented implementation of the Material-UI Modal component to be used on the Dashboard/Explore page for uploading a text/csv files (by default).

For the component's technical details, please see [DESIGN.md](./DESIGN.md). For details about the Redux usage, please see [README.md](../../README.md) in the parent folder.

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  // Import the component
  import { SearchBoxGenerator } from '@bento-core/local-find';

  // Generate the component with the default options
  const { SearchBox } = SearchBoxGenerator();

  const classes = {
    root: {
      // ... Inline styles for the root element
    },
    // ... Other classes
  };

  // Use the component
  const modal = (
    <SearchBox classes={classes} />
  );
  ```

  > **Warning**: If the parent component is rerendered, the SearchBox will be regenerated every time. It's best to keep
  > the generator function call outside of the parent component.
</details>

# Generator Configuration

```JAVASCRIPT
export const DEFAULT_CONFIG_SEARCHBAR = {
  // Misc. Configuration Options
  config: {
    inputPlaceholder: 'e.g. BENTO-CASE-06, BENTO-CASE-22', // The textarea placeholder
    noOptionsText: 'No matching items found',              // The text to display when no autocomplete opts are found
    searchType: 'subjectIds',                              // The search type to use for the autocomplete
  },

  // Helper functions used by the component
  functions: {
    /**
     * A function that is called when the autocomplete selection changes
     *
     * @param {array} newValue New array of selected items from the autocomplete
     * @param {string} reason reason for the change event
     * @param {boolean} deleted was an item deleted
     */
    onChange: (newValue = [], reason, deleted) => {},

    /**
     * Perform autocomplete search on the API
     *
     * NOTE:
     * - This function is not designed to query the API
     *   for results matching the search term. It is
     *   designed to query the API for ALL autocomplete options
     * - This function does not need to be async if
     *   you have the search results already available. It,
     *   however, must resolve to an 1-D array of results.
     * - The return value of this function is CACHED if
     *   it returns a valid array.
     *
     * @async
     * @param {string} searchType search type defined in the config
     * @returns {Promise} Promise object represents the search results
     */
    getSuggestions: async (searchType) => [],
  },
  // syles used for styling the search input and search list
  customStyles:  {
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
      marginTop: -4,
    },
    closeRoot: {
      height: 10,
    },
    listItemGutters: {
      padding: '0px 15px 0px 18px !important',
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
    divider: {
      backgroundColor: '#B1B1B1',
      height: '1px',
      marginRight: 11,
      marginLeft: 12,
    },
  },
};
```

# Exports

The component exports the following components, objects, and functions by default. You may use them as necessary.

- `SearchBoxGenerator(options)`
- `DEFAULT_CONFIG_SEARCHBAR`

# Props

The SearchBox component accepts the following props directly. The default value is specified, along with the prop definition.

```javascript
<SearchBox
  classes={undefined}  // Object of Material-UI classes to override
/>
```
