# Introduction

Global Search is a component that provides a implementation of a site-wide search. These components provide easy-to-use implementations for the Global Search feature. The two primary components provided by this package are:

  1. SearchBar -- This bar is designed to be in the header throughout the application and is a typeahead (autocomplete) wrapper.
  2. SearchResults -- This is the result section of a search, not to be confused with SearchBar results. It's found on the search page and has server-paginated search result cards (e.g. for Files, Programs, Samples, etc).

# Getting Started

To import the components from GlobalSearch, use the following:

```javascript
import { SearchBarGenerator, SearchResults } from './GlobalSearch'; // Update path as needed
```

Each of the components has their own respective README.md files. Please see the following links for detailed instructions on how to use them:

* [SearchBar README](./SearchBar/README.md) or [SearchBar DESIGN](./SearchBar/DESIGN.md)
* [SearchResults README](./SearchResults/README.md) or [SearchResults DESIGN](./SearchResults/DESIGN.md)
