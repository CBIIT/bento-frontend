/**
 * Default configuration for the SearchBar component
 *
 * @typedef {object}
 */
export const DEFAULT_CONFIG_SEARCHBAR = {
  /**
   * Misc. Configuration Options
   *
   * @typedef {object} config
   */
  config: {
    query: null,
    searchKeys: [],
    searchFields: [],
    placeholder: 'SEARCH BENTO',
    expandText: 'Press ENTER for more search results',
    searchRoute: '/search',
    minimumInputLength: 3,
    maxSuggestions: 6,
  },

  /**
   * SearchBar Helper Functions
   *
   * NOTE: You do not need to provide all of these functions,
   * only the ones you need to override. The default
   * will be used if not provided.
   *
   * @typedef {object} functions
   */
  functions: {
    /**
     * Perform an action when the search bar value changes
     *
     * NOTE: By default, this will redirect to the search route
     * denoted by the searchRoute config option
     *
     * @param {string} value
     * @param  {...any} args
     */
    onChange: (value, ...args) => {
      if (!value || typeof value !== 'string') { return; }
      if (!args || !args.length) { return; }

      // Navigate to the search route using React.useHistory
      args[1].push(`${args[0]}/${value}`);
    },

    /**
     * Helper function to filter result options
     *
     * @param {object|string} option
     * @returns string|boolean
     */
    filterOptions: (option) => option,

    /**
     * Returns the label for the option. Useful for nested or complex API responses
     *
     * @param {object|string} option
     * @returns string option label
     */
    getOptionLabel: (option) => option,

    /**
     * Perform autocomplete search on the API
     *
     * NOTE: This function does not need to be async if
     * you have the search results already available. It,
     * however, must resolve to an 1-D array of results.
     *
     * @async
     * @param {object} config this configuration object
     * @param {string} search search input typed into the search bar
     * @returns {Promise} Promise object represents the search results
     */
    getSuggestions: async (config, search) => {
      const { query, searchKeys, searchFields } = config;

      // Query the API
      const searchResp = await query(search);

      // Parse the response fields
      const mapOption = searchKeys.map((k, v) => searchResp[k].map((id) => (id[searchFields[v]])));

      // Return the results array
      return mapOption.length ? mapOption.reduce((acc = [], it) => [...acc, ...it]) : [];
    },
  },
};

export default DEFAULT_CONFIG_SEARCHBAR;
