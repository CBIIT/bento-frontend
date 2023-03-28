# Introduction

The Local Find package provides components relating to the Dashboard/Explore case search feature. There are two primary components provided by this package:

  1. SearchBox – This is the case search autocomplete bar found on the Dashboard/Explore page. It provides a typeahead (autocomplete) wrapper with minimal configuration and lists the selected case filters.
  2. UploadModal – This is the modal that appears when a user clicks the "Upload Case Set" (by default) button. It handles TXT/CSV file uploads by default and passes the search entries to a search function.

# Getting Started

To import the components from LocalFind, use the following:

```javascript
import { SearchBoxGenerator, UploadModalGenerator } from '@bento-core/local-find';
```

Each of the components has their own respective README.md files. Please see the following links for detailed instructions on how to use them:

* [SearchBox README](./SearchBox/README.md) or [SearchBox DESIGN](./SearchBox/DESIGN.md)
* [UploadModal README](./UploadModal/README.md) or [UploadModal DESIGN](./UploadModal/DESIGN.md)

# Redux

## Basic Usage

Local Find provides a Redux reducer generator for implementing within the Bento global state. To add the reducer to the global state, add the following code to the `reducers` object in the Redux Store [store/index.js](../../store/index.js):

```javascript
import { LocalFindReducerGenerator } from '@bento-core/local-find';

const { localFind } = LocalFindReducerGenerator();

const reducers = {
  localFind,
  // ...
};
```

The localFind state can then be accessed from the global state using the `localFind` key. The state is structured as follows:

```javascript
{
  localFind: {
    autocomplete: [
      // Autocomplete selection
      // e.g. [ { "type": "subjectIds", "title": "BENTO-CASE-3405467" }, ... ]
    ],
    upload: [
      // Upload selection
      // e.g. [ "BENTO-CASE-3405467", ... ]
    ]
    uploadMetadata: {
      // Current upload modal metadata
      // e.g.
      // "filename": "casefile.txt",
      // "fileContent": "BENTO-CASE-01\nBENTO-CASE-02\nBENTO-WENTO-03\nBENTO-CASE-9990847\n",
      // "matched": [
      //     {
      //         "subject_id": "BENTO-CASE-9990847",
      //         "program_id": "NCT00310180",
      //     }
      // ],
      // "unmatched": [
      //     "BENTO-CASE-01",
      //     "BENTO-CASE-02",
      //     "BENTO-WENTO-03"
      // ]
    }
  },
}
```

## Advanced Usage

If you need to programatically dispatch a Local Find redux event, the internal events are exposed as action creators. To use them, import the action creator from the Local Find package and dispatch it to the store:

```javascript
import {
  resetUploadData
} from 'LocalFind';

store.dispatch(resetUploadData([]))
```

> **Note**: You can find the full list of action creators in the [Actions.js](./store/actions/Actions.js) file.
