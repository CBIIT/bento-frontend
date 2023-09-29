# Overview

This component provides a Bento-oriented implementation of the Material-UI Modal component to be used on the Dashboard/Explore page for uploading a text/csv files (by default).

For the component's technical details, please see [DESIGN.md](./DESIGN.md). For details about the Redux usage, please see [README.md](../../README.md) in the parent folder.

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  // Import the component
  import { UploadModalGenerator } from '@bento-core/local-find';

  // Generate the component with the default options
  const { UploadModal } = UploadModalGenerator();

  // Use the component
  const modal = (
    <UploadModal
      classes={classes}
      open={true}
    />
  );
  ```

  > **Warning**: If the parent component is rerendered, the modal will be regenerated every time. It's best to keep
  > the generator function call outside of the parent component.
</details>

# Generator Configuration

```JAVASCRIPT
export const DEFAULT_CONFIG_UPLOADMODAL = {
  // Misc. Configuration Options
  config: {
    title: 'Upload Case Set',                   // The title of the modal
    inputPlaceholder: 'eg. CASE-123',           // The placeholder text for the textarea input
    inputTooltip: 'Add the case indentifier.',  // The tooltip text for the textarea input section. Empty = no tooltip
    uploadTooltip: 'Add the case indentifier.', // The tooltip text for the upload button section. Empty = no tooltip
    accept: '.csv,.txt',                        // The file types that can be uploaded (must be text/* files only)
    maxSearchTerms: 1000,                       // The maximum number of search terms that can be searched for. See note below.
    matchedId: 'subject_id',                    // The property(key) name for the first column in the backend response object 
    matchedLabel: 'SUBMITTED CASE ID',          // The header text of the first column of the matched summary table in the Upload Modal
    associateId: 'program_id',                  // The property(key) name for the second column in the backend response object 
    associateLabel: 'ASSOCIATED PROGRAM',       // The header text of the second column of the matched summary table in the Upload Modal
    projectName: 'BENTO',                       // The project name that appears in the text that appears when matching id is found 
  },

  // Helper functions used by the component
  functions: {
    /**
     * Callback function called when the modal is closed.
     *
     * @param void
     * @return void
     */
    modalClosed: () => {},

    /**
     * Perform a API search on the array of input terms
     *
     * Note: You can assert that inputArray will ALWAYS be an
     * array of ONLY strings. It may or may not be empty, and
     * it may contain duplicate entries.
     *
     * @param {array} inputArray
     * @return {Promise} Resolves to an object of { matched: [], unmatched: [] } matched and
     * unmatched search results
     */
    searchMatches: async (inputArray) => {},
  },
};
```

> **Note**: The configuration option `maxSearchTerms` specifies the maximum number of matched search terms (e.g. cases)
> that can be submitted to the dashboard/explore page. This addresses an OpenSearch maximum clause count issue. If over this limit, the submit button will be disabled and an error will be visible.

# Exports

The component exports the following components, objects, and functions by default. You may use them as necessary.

- `UploadModalGenerator(options)`
- `DEFAULT_CONFIG_UPLOADMODAL`

# Props

The UploadModal component accepts the following props directly. The default value is specified, along with the prop definition.

```javascript
<UploadModal
  classes={undefined}      // Object of Material-UI classes. { ...classes, FileUploader: {}, SummaryTable: {} }
  styles={undefined}       // Inline styles to apply to the root element
  open={false}             // Boolean to control the open state of the modal
  onCloseModal={undefined} // Function called when a request to close the modal is made. Used to update the open state.
  // ... Other props are passed to the underlying Material-UI Modal component
/>
```

> **Note**: The root level `classes` are used by the Material-UI modal, `FileUploader` classes are passed to the `FileUploader` component, and `SummaryTable` classes objects are passed to the `SummaryTable` component.
> The default styles included with the component are applied AFTER any overrides provided.
