# Introduction

This package provides the Query Bar component that displays the current Facet Search and Local Find filters on the Dashboard/Explore page. It also provides the direct ability to reset all or some of the filters with the click of a button. It is designed to be implemented directly with the:

- `@bento-core/local-find`
- `@bento-core/facet-filter`

packages. For the component's technical details, please see [DESIGN.md](./DESIGN.md).

See below for usage instructions.

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  import { QueryBarGenerator } from '@bento-core/query-bar';

  // Generate the component
  const { QueryBar } = QueryBarGenerator({
    /** See Generator Options **/
  });

  // Use the component (e.g. In dashTemplateView.js)
  const Layout = ({ classes, data, states, /* ... */}) => {
    return (
      {/* other components */}
      <div className={classes.rightContent}>
        <div className={classes.widgetsContainer}>
          {/* other components */}

          <QueryBar statusReducer={null} localFind={null} />

          {/* other components */}
        </div>
      </div>
      {/* other components */}
    );
  };
  ```

  > **Warning**: The `statusReducer` prop requires the dashboard API data merged with the `facetsConfig` property. Please see the example in the demo implementation [here](https://github.com/CBIIT/bento-frontend/blob/7efd62cd3da0c29326e523055d30118244dc2f2f/packages/bento-frontend/src/pages/dashTemplate/filterQueryBar/QueryBarView.js#LL20C14-L20C14).
</details>

## Generator Configuration

See the available `DEFAULT_CONFIG_QUERYBAR` object to understand the component generator options. You can choose to override `config`, and/or `functions`. You DO NOT need to override all of the options if you don't want to. The component generator will only use the options you provide.

```javascript
const CONFIG = {
  /* General Component Configuration */
  config: {
    /**
     * The maximum number of items to display in a query bar facet section
     * @var {number}
     */
    maxItems: 2,
  },

  /* Component Helper Functions */
  functions: {
    /**
     * Clear all active facet/local find filters
     *
     * @returns {void}
     */
    clearAll: () => {},

    /**
     * Clear all active Local Find file upload filters
     *
     * @returns {void}
     */
    clearUpload: () => {},

    /**
     * Clear all active Local Find searchbox filters
     *
     * @returns {void}
     */
    clearAutocomplete: () => {},

    /**
     * Delete a specific Local Find searchbox filter (case)
     *
     * @param {string} title
     * @returns {void}
     */
    deleteAutocompleteItem: (title) => {},

    /**
     * Reset a specific facet section (e.g. Program)
     *
     * @param {object} section the configuration object for the section
     * @returns {void}
     */
    resetFacetSection: (section) => {},

    /**
     * Reset a specific facet checkbox (e.g. Program > TAILORx)
     *
     * @param {object} section the configuration object for the section
     * @param {string} checkbox the name of the checkbox
     * @returns {void}
     */
    resetFacetCheckbox: (section, checkbox) => {},

    /**
     * Reset a specific slider section (e.g. Age)
     *
     * @param {object} section the configuration object for the section
     * @returns {void}
     */
    resetFacetSlider: (section) => {},
  },
  // Styles for the querybar
  customStyles: {
    queryWrapper: {
      height: '120px',
      backgroundColor: '#f1f1f1',
      padding: '14px 14px 0px 35px',
      overflowY: 'auto',
    },
    queryContainer: {
      marginLeft: 7,
      position: 'relative',
      lineHeight: '2.4em',
      letterSpacing: '0.5px',
      fontFamily: 'Nunito',
      fontSize: '14px',
      color: '#0e3151',
    },
    filterName: {
      textTransform: 'uppercase',
      padding: '5px 6px 5px 7px',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    filterCheckboxes: {
      padding: '4px 7px 3px 6px',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      border: '0.75px solid #898989',
      width: 'fit-content',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    bracketsOpen: {
      fontSize: 18,
      fontFamily: 'Nunito Sans Semibold',
      color: '#787878',
      marginRight: 3,
      fontWeight: 600,
    },
    bracketsClose: {
      fontSize: 18,
      fontFamily: 'Nunito Sans Semibold',
      color: '#787878',
      marginLeft: 3,
      fontWeight: 600,
    },
    operators: {
      color: '#646464',
      marginLeft: '3px',
      marginRight: '3px',
      borderBottom: 'none',
      textDecoration: 'none',
      fontSize: 10,
      fontWeight: 'bold',
    },
    clearQueryButton: {
      margin: '1px',
      marginLeft: -6,
      fontWeight: 600,
      fontSize: '13px',
      color: '#fff',
      borderRadius: '15px',
      fontFamily: 'Nunito',
      boxSizing: 'border-box',
      backgroundColor: '#969696',
      textTransform: 'capitalize',
      border: '1px solid #B4B4B4',
      padding: '1px 5px 0px 6px',
      '&:hover': {
        backgroundColor: '#969696',
      },
    },
    divider: {
      borderRight: '2px solid #969696',
      marginLeft: 7,
    },
    /* Custom Styling by Project */
    localFind: {
      color: '#10A075',
    },
    localFindBackground: {
      backgroundColor: '#C0E9D7',
    },
    facetSectionCases: {
      color: '#10A075',
    },
    facetSectionCasesBackground: {
      backgroundColor: '#C0E9D7',
    },
    facetSectionFiles: {
      color: '#E636E4',
    },
    facetSectionFilesBackground: {
      backgroundColor: '#F5C3F1',
    },
    facetSectionSamples: {
      color: '#10BEFF',
    },
    facetSectionSamplesBackground: {
      backgroundColor: '#C3EAF5',
    },
    expandBtn: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    collapseBtn: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
};
```

# Exports

This component exports the following components and objects by default. You may use them as necessary.

- `QueryBarGenerator` - The component generator function
- `DEFAULT_CONFIG_QUERYBAR` - The default configuration object
- `DEFAULT_STYLES_QUERYBAR` – The default Material UI styles

# Props

This component, which is generated by the provided generator, accepts the following props directly. The default value is specified, along with the possible values. The `classes` prop will override the default styling for any provided classes.

```javascript
<QueryBar
  statusReducer={undefined}  // {object} - The status reducer object with the section `facetsConfig` combined
  localFind={undefined}      // {object} - The local find reducer object (Not modified)
  classes={undefined}        // {object} - The Material UI classes object. Overrides default styling for provided classes.
/>
```

> **Warning**: The `statusReducer` prop requires the dashboard API data merged with the `facetsConfig` property. Please see the example in the demo implementation [here](https://github.com/CBIIT/bento-frontend/blob/7efd62cd3da0c29326e523055d30118244dc2f2f/packages/bento-frontend/src/pages/dashTemplate/filterQueryBar/QueryBarView.js#LL20C14-L20C14).
