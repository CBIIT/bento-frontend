# Overview

This document describes the technical design behind this component. For actual usage, please see the [README.md](./README.md) in this folder.

# Details

## States

This component uses **local** states for:

- Current value (`inputValue`)
- Autocomplete results
- Autocomplete fetching status (i.e. `loading`)

|State|Shape|Default|
|:-|:-|:-|
|`inputValue`|A string containing search input|*empty*|
|`results`|An array of results, sometimes containing JSX elements e.g. `["a", "b", "c"]`|`[]`|
|`loading`|A boolean indicator of whether or not the element is loading autocomplete results|`false`|

## Retrieval

The main component, `<SearchBar>` is generated through the `SearchBarGenerator()` function. See the main [README.md](./README.md) for more information. The sub-components found in [components](./components/) are not designed to be used outside of this component, but are retrieved via importing them directly. No documentation on using them directly is provided.

## Configuration

The default configuration object is defined in [config.js](./config.js). To override and customize the component, you must provide the new configuration object to the `SearchBarGenerator()` function. **You do not need to override every option** only overriden options will be used.
