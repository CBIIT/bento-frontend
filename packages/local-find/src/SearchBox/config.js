/* eslint-disable no-unused-vars */
/**
 * Default configuration for Local Find Upload Modal
 */
export const DEFAULT_CONFIG_SEARCHBAR = {
  // Misc. Configuration Options
  config: {
    inputPlaceholder: 'e.g. BENTO-CASE-06, BENTO-CASE-22',
    noOptionsText: 'No matching items found',
    /**
     * Search type(s) to fetch suggestions for. Can be a single string
     * (e.g. 'subjectIds') for backward compatibility, or an array of
     * search types (e.g. ['participantIds', 'associatedIds']) to enable
     * synonym-style multi-source autocomplete.
     */
    searchType: 'subjectIds',
    /** aria-label applied to the autocomplete input for accessibility */
    ariaLabel: 'Search',
  },

  // Helper functions used by the component
  functions: {
    /**
     * A function that is called when the autocomplete selection changes
     *
     * @param {array} newValue New array of selected items from the autocomplete
     * @param {string} reason reason for the change event
     * @param {boolean} deleted was an item deleted
     */
    onChange: (newValue = [], reason, deleted) => {},

    /**
     * A function that is called when the autocomplete selection changes
     *
     * @param void
     * @return void
     */
    updateBrowserUrl: () => {},

    /**
     * Perform autocomplete search on the API
     *
     * NOTE:
     * - This function is not designed to query the API
     *   for results matching the search term. It is
     *   designed to query the API for ALL autocomplete options
     * - This function does not need to be async if
     *   you have the search results already available. It,
     *   however, must resolve to an 1-D array of results.
     * - The return value of this function is CACHED if
     *   it returns a valid array.
     *
     * @async
     * @param {string|string[]} searchType search type(s) defined in the
     *   config. Will be a string when `config.searchType` is a string and
     *   an array when `config.searchType` is an array.
     * @returns {Promise} Promise object represents the search results.
     *   Each item is expected to be an object of the form
     *   `{ type, title, synonym? }`. Items with `type === 'associatedIds'`
     *   are rendered as synonym matches.
     */
    getSuggestions: async (searchType) => [],
  },
};

export default DEFAULT_CONFIG_SEARCHBAR;
