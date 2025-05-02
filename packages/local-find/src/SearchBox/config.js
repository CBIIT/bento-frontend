/* eslint-disable no-unused-vars */
/**
 * Default configuration for Local Find Upload Modal
 */
export const DEFAULT_CONFIG_SEARCHBAR = {
  // Misc. Configuration Options
  config: {
    inputPlaceholder: 'e.g. BENTO-CASE-06, BENTO-CASE-22',
    noOptionsText: 'No matching items found',
    searchType: ['subjectIds'],
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
     * @param {string} searchType search type defined in the config
     * @returns {Promise} Promise object represents the search results
     */
    getSuggestions: async (searchType) => [],
  },
};

export default DEFAULT_CONFIG_SEARCHBAR;
