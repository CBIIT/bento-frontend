# Overview

This component provides a Bento-oriented implementation of the Material-UI TabContext and TabPanel components. Each tab also handles result pagination if necessary. See below for basic usage.

For the component's technical details, please see [DESIGN.md](./DESIGN.md).

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  // Import the component
  import { SearchResults } from '...'; // Note: update the path

  // Use the component
  const results = (
    <SearchResults
      classes={{}}
      searchText={"search text"}
      tabs={[ /* see below for definition */ ]}
    />
  );
  ```

</details>

# Exports

The SearchResults component exports the following components and objects by default. You may use them as necessary.

- `SearchResults`

# Props

This SearchResults component accepts the following props directly. The default value is specified, along with the possible values.

```javascript
<SearchResults
  classes={undefined}          // object – The classes to apply to the component
  searchText={""}              // string – The search query string used to fetch the results
  tabs={undefined}             // array – An array of tab configuration...See Below
  activeTab={undefined}        // *optional* number|string – The selected tab. If not provided, the first tab will be used.
  onTabChange={undefined}      // *optional* function – The function to call when the tab changes
  pageSize={10}                // *optional* number – The number of results to display per page
  resultCardMap={undefined}    // *optional* object – A map of result types to their corresponding card components...See Below
/>
```

**NOTE:** To prevent unnecessary re-renders, the `tab` prop should not be tracked as a state in the parent component. It should only be used to set the initial tab.

## resultCardMap

The `resultCardMap` prop is used to map the result type to the corresponding card component. This property is optional, and will use the default card map (See `DEFAULT_CARD_MAP` in [ResultCard.js](components/ResultCard.js)) if not provided. Additionally, if you only provide/override certain properties, the default map will be used for the remaining types.

- What is a Result Card? See an example card in [Cards/CaseCard.js](components/Cards/CaseCard.js).

The expected property structure is `datatype`:`JSX.Component`. For example:

```javascript
import CaseCard from 'Cards/CaseCard.js';
import AboutCard from 'Cards/AboutCard.js';

const cardMap = {
  subject: CaseCard,
  about: AboutCard,
  // ... and so on
};
```

**Note for future developers:** The cardMap cannot be tied to the individual tab configuration, because of mixed card situations such as the All tab.

## tabs

The tab configuration (defined via the `tabs` prop) is critical to this component. See below for the definition of the tab configuration object. Each object in the array represents a single tab and tab panel that will be created (created as a set together).

```javascript
[
  {
    name: 'Cases',                                         // string|function – The name of the tab to display
    classes: {},                                           // object – Specific classes to apply TO ONLY THIS TAB
    count: 0,                                              // number – The total number of results for this tab
    value: '2',                                            // number|string – The value of the tab. Used to determine which tab is active
    getData: async (search, pageSize, currentPage) => {},  // function – The function used to fetch the data for this tab. Should return an array of results.
  },

  // ... repeating
]
```

Some notes about the tab configuration options:

| Property |  Description |
|:-|:-|
|`name`|The name of the tab to display and is used as the tab label. If you would like to provide a custom component instead of just plain text, you can pass a function which returns a JSX component. This can be used to add icons, etc. to the tab label.|
|`classes`|The classes option can be used to override default styling for the specific tab. This styling is passed down to any children cards, and can be used on them as well (e.g. CaseCard, StudyCard, etc.).
|`getData`|The function signature is `async (searchText, pageSize, currentPage)`.<br><br>It should return a promise which resolves to an array of result objects returned by the Bento backend API. The array should be no larger than `pageSize` (defined by the `pageSize` SearchResults prop). The `currentPage` parameter is used to determine the offset for the API call.|
