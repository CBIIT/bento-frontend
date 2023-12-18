/**
 * Default configuration for search results component
 */
export const DEFAULT_CONFIG_SEARCHRESULTS = {
  // Classes to apply to the search results page
  classes: {},

  // Misc. Configuration Options
  config: {
    // Number of results to display per page
    pageSize: 10,

    // The default tab to display
    defaultTab: null,

    // The mapping of search result types to JSX components
    resultCardMap: {},

    // Whether to display the Filter icon and "FILTER BY" text or not
    showFilterBy: false,
  },

  // Helper functions used by the component
  functions: {
    /**
     * Handler for tab change event
     *
     * @param {object} event change event
     * @param {*} newTab new tab value
     */
    // eslint-disable-next-line no-unused-vars
    onTabChange: (event, newTab) => {},

    /**
     * Helper function to fetch data for a given tab
     * This function should return a promise that resolves to an array of objects
     *
     * NOTES:
     * - The result structure is dependent on the cardMap and how
     *   the card uses the data.
     * - The result should be no larger than `pageSize` (defined
     *   by the `pageSize` config option).
     * - The `currentPage` parameter is used to determine the offset for the API call.
     *
     * @param {string} field the field to search on
     * @param {number} pageSize the number of results to fetch per page
     * @param {number} currentPage the current page number
     */
    // eslint-disable-next-line no-unused-vars
    getTabData: async (field, pageSize, currentPage) => [],
  },
};

export default DEFAULT_CONFIG_SEARCHRESULTS;
