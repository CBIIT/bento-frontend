# Overview

This component provides a Bento-oriented implementation of the Material-UI TabContext and TabPanel components. Each tab also handles result pagination if necessary. See below for basic usage.

For the component's technical details, please see [DESIGN.md](./DESIGN.md).

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  // Import the component
  import { SearchResultsGenerator } from '@bento-core/global-search'; // Note: update the path

  // Generate the component with the default options
  const { SearchResults } = SearchResultsGenerator();

  // Use the component
  const results = (
    <SearchResults searchText={"search text"} />
  );
  ```

</details>

# Generator Configuration

```JAVASCRIPT
const DEFAULT_CONFIG_SEARCHRESULTS = {
  // Classes to apply to the search results page
  classes: {},

  // Misc. Configuration Options
  config: {
    // Number of results to display per page
    pageSize: 10,

    // The default tab to display
    defaultTab: null,

    // The mapping of search result types to JSX components
    // See below for more details
    resultCardMap: {},

    // Whether to display the Filter icon and "FILTER BY" text or not
    showFilterBy: false,
  },

  // Helper functions used by the component
  functions: {
    /**
     * Handler for tab change event
     *
     * @param {object} event change event
     * @param {*} newTab new tab value
     */
    onTabChange: (event, newTab) => {},

    /**
     * Helper function to fetch data for a given tab
     * This function should return a promise that resolves to an array of objects
     *
     * NOTES:
     * - The result structure is dependent on the cardMap and how
     *   the card uses the data.
     * - The result should be no larger than `pageSize` (defined
     *   by the `pageSize` config option).
     * - The `currentPage` parameter is used to determine the offset for the API call.
     *
     * @param {string} field the field to search on
     * @param {number} pageSize the number of results to fetch per page
     * @param {number} currentPage the current page number
     */
    getTabData: async (field, pageSize, currentPage) => [],
  },
}
```

## resultCardMap

The `resultCardMap` option is used to map the tab datafield to the corresponding card component. **This property is optional**, and will use the default card map (See `DEFAULT_CARD_MAP` in [ResultCard.js](components/ResultCard.js)) if not provided.

> **Note**: The purpose of this option is if you need to completely restructure a card. If you only need to restyle it, see the `classes` option for `tabs` below.

Additionally, if you only provide/override certain properties, the default map will be used for the remaining types.

> **Note**: See an example Result Card in [Cards/CaseCard.js](components/Cards/CaseCard.js).

The expected property structure is `datatype`:`JSX.Component`. For example:

```javascript
// Define a new card component
const NewCardExample = ({ data, index }) => {
  return (
    <div id={index}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

// Create a new card map
const customCardMap = {
  // Override the subject card with NewCardExample
  subject: NewCardExample,

  // ... and so on
};

// Then generate the component with the new card map
const { SearchResults } = SearchResultsGenerator({
  config: {
    resultCardMap: customCardMap,
  },
});

// Use the SearchResults component
// ...
```

> **Warning**: The cardMap cannot be tied to the individual tab configuration because of mixed card situations such as the All tab.

If you provide a custom card type, each time the card is rendered, it will be passed the following props:

- `data` - The array/object of data for the card. e.g. An instance of a Case, Study, etc.
- `classes` - The classes prop defined in the Configuration Tab `classes` object (See below)
- `index` - The current index offset (e.g. 291)
- `searchText` - The text used to search for the results. Useful for highlighting the search text in the card.

## tabs

The tab configuration (defined via the `tabs` option) is critical to this component. See below for the definition of the tab configuration object. Each object in the array represents a single tab and tab panel that will be created (created as a set together).

```javascript
[
  {
    name: 'Cases',                                         // string|function – The name of the tab to display
    field: 'subject',                                      // string – The field to search on. Passed to the `getTabData` function
    classes: {},                                           // object – Specific classes to apply TO ONLY THIS TAB
    count: 0,                                              // number – The total number of results for this tab
    value: '2',                                            // number|string – The value of the tab. Used to determine which tab is active
  },

  // ... repeating
]
```

Some notes about the tab configuration options:

| Property |  Description |
|:-|:-|
|`name`|The name of the tab to display and is used as the tab label. If you would like to provide a custom component instead of just plain text, you can pass a function which returns a JSX component. This can be used to add icons, etc. to the tab label. e.g. `name: () => <div>Cases</div>,`|
|`classes`|The classes option can be used to override default styling for the specific tab. This styling is passed down to any children cards, and can be used on them as well (e.g. CaseCard, StudyCard, etc.).|
|`count`|By default, this property is used for two things:<br>(1) The label of the tab (e.g. `Cases 23`)<br>(2) Whether to fetch the data for the tab when loading results. If the count is 0, no data will be fetched.|

# Exports

The SearchResults component exports the following components, objects, and functions by default. You may use them as necessary.

- `SearchResultsGenerator(options)`
- `DEFAULT_CONFIG_SEARCHRESULTS`
- `countValues(obj)`

# Props

This SearchResults component accepts the following props directly. The default value is specified, along with the possible values.

```javascript
<SearchResults
  searchText={""} // string – The search query string used to fetch the results
/>
```
