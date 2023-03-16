# Overview

This document describes the technical design behind this component. For actual usage, please see the [README.md](./README.md) in this folder.

# Details

## States

This component uses **local** states for things such as:

- Tracking the current page (for pagination)
- Storing the current API data
- etc

No global/redux states are implemented by this component.

## Retrieval

The main component, `<SearchResults>` is generated through the `SearchResultsGenerator()` function. See the main [README.md](./README.md) for more information. The sub-components found in [components](./components/) are not designed to be used outside of this component, but are retrieved via importing them directly. No documentation on using them directly is provided.

Sub components include:

- CardMap – Provides default mapping from a search result type to a card component
- PaginatedPanel – A "bento-fied" wrapper for the Material-UI pagination component. Handles data fetching and pagination state.
- [Cards/*](components/Cards/) – A collection of card components for displaying search results

## Configuration

The default configuration object is defined in [config.js](./config.js). To override and customize the component, you must provide the new configuration object to the `SearchResultsGenerator` function. **You do not need to override every option** only overriden options will be used.
