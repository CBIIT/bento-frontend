# Overview

This document describes the technical design behind this component. For actual usage, please see the [README.md](./README.md) in this folder.

# Details

## States

This component uses **local** states for things such as:

- The current file upload and contents
- Storing the Matched/Unmatched Case IDs
- The current upload summary tab
- Etc

This component uses the **redux** state `localFind` for:

- The current file upload metadata (Matched IDs, name, content, etc)
- Tracking the current search set of IDs

For specifics on the redux state, please see the [README.md](../../README.md) in the parent folder.

## Retrieval

The main component, `<UploadModal>` is generated through the `UploadModalGenerator(OPTS)` function. See the main [README.md](./README.md) for more information. The sub-components found in [components](./components/) are not designed to be used outside of this component, but are retrieved via importing them directly and used as a standard JSX component. No documentation on using them directly is provided.

Sub components include:

- [`<FileUploader>`](components/FileUploader.js)
- [`<SummaryTable>`](components/SummaryTable.js)

## Configuration

The default configuration object is defined in [config.js](./config.js). To override and customize the component, you must provide the new configuration object to the `UploadModalGenerator` function. **You do not need to override every option** only overriden options will be used.
