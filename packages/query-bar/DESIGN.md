# Overview

This document describes the technical design behind this component. For actual usage, please see the [README.md](./README.md) in this folder.

# Details

## Bases

This component is based on the following:

- N/A – This is a custom component not based on a specific Material-UI component

## States

This component uses **local** states for:

- N/A – The component does not use local states

This component watches the **global** state for:

- The Dashboard Facet Sidebar State (`state->statusReducer->filterState`)
- The Local Find State (`state->localFind`) (`->upload` and `->autocomplete`)

> **Note**: This component does not modify the global state or the property mentioned above.

## Retrieval

The main component, `<QueryBar>` is generated through the `QueryBarGenerator()` function. See the main [README.md](./README.md) for more information. The sub-components found in [components](./src/components/) are not designed to be used outside of this component, but are retrieved via importing them directly. No documentation on using them directly is provided.

## Configuration

The default configuration object is defined in [config.js](./src/Generators/config.js). To override and customize the component, you must provide the new configuration object to the `QueryBarGenerator()` function. **You do not need to override every option** only overriden options will be used.
