# Overview

This document describes the technical design behind this component. For actual usage, please see the [README.md](./README.md) in this folder.

# Details

## States

This component uses **local** states for things such as:

- The current open/closed state of the autocomplete dropdown
- The autocomplete suggestion *cache* (to prevent unnecessary API calls)

This component uses the **redux** state `localFind` for:

- The list of currently "selected" case IDs

For specifics on the redux state, please see the [README.md](../../README.md) in the parent folder.

## Retrieval

The main component, `<SearchBox>` is generated through the `SearchBoxGenerator(OPTS)` function. See the main [README.md](./README.md) for more information. The sub-components found in [components](./components/) are not designed to be used outside of this component, but are retrieved via importing them directly and used as a standard JSX component. No documentation on using them directly is provided.

Sub components include:

- [`<CustomTextField>`](components/CustomTextField.js) – The input text field for the search box
- [`<SearchList>`](components/SearchList.js) – The list of "selected" case IDs

## Configuration

The default configuration object is defined in [config.js](./config.js). To override and customize the component, you must provide the new configuration object to the `SearchBoxGenerator` function. **You do not need to override every option** only overriden options will be used.
