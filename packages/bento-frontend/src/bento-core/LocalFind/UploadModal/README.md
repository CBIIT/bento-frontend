# Overview

This component provides a Bento-oriented implementation of the Material-UI Modal component to be used on the Dashboard/Explore page for uploading a text/csv files (by default).

For the component's technical details, please see [DESIGN.md](./DESIGN.md).

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  // Import the component
  import { UploadModalGenerator } from '...'; // Note: update the path

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
     * Callback function to apply the search to the dashboard page
     *
     * Note: After applying the search, you should close the modal
     *
     * @param {array} matchedArray array of matched search results (returned from searchMatches)
     * @return void
     */
    applySearch: (matchedArray) => {},

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
