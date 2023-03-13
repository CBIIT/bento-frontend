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

The main component, `<SearchResults>` is exported as a standard JSX component. See the main [README.md](./README.md) for more information. The sub-components found in [components](./components/) are not designed to be used outside of this component, but are retrieved via importing them directly. No documentation on using them directly is provided.

Sub components include:

- CardMap – Provides default mapping from a search result type to a card component
- PaginatedPanel – A "bento-fied" wrapper for the Material-UI pagination component. Handles data fetching and pagination state.
- [Cards/*](components/Cards/) – A collection of card components for displaying search results

## Configuration

N/A – This component does not use a generator and does not have any traditional configuration options.
