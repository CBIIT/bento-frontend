# Overview

This document describes the technical design behind this component. For actual usage, please see the [README.md](./README.md) in this folder.

# Details

## Bases

This component is based on the following:

- [Material UI Dialog](https://mui.com/material-ui/react-dialog/)

## States

This component uses **local** states for:

- The current modal state (open/closed)
- The session timeout (TTL) value
- An internal interval ID (for the ping interval)

This component watches the **global** state for:

- The current authentication state (`state->login->isSignedIn`)

> **Note**: This component does not modify the global state or the property mentioned above.

## Retrieval

The main component, `<SessionTimeout>` is generated through the `SessionTimeoutGenerator()` function. See the main [README.md](./README.md) for more information. The sub-components found in [components](./src/components/) are not designed to be used outside of this component, but are retrieved via importing them directly. No documentation on using them directly is provided.

## Configuration

The default configuration object is defined in [config.js](./src/Generators/config.js). To override and customize the component, you must provide the new configuration object to the `SearchBarGenerator()` function. **You do not need to override every option** only overriden options will be used.
