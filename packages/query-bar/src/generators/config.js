/* eslint-disable no-unused-vars */
export default {
  /* General Component Configuration */
  config: {
    /**
     * The maximum number of items to display in a query bar facet section
     * @var {number}
     */
    maxItems: 2,
    /**
     * overirdes maxItems to display all the active filter items
     * @var {boolean}
     */
    displayAllActiveFilters: false,
  },

  /* Component Helper Functions */
  functions: {
    /**
     * Clear all active facet/local find filters
     *
     * @returns {void}
     */
    clearAll: () => {},

    /**
     * Clear all active Local Find file upload filters
     *
     * @returns {void}
     */
    clearUpload: () => {},

    /**
     * Clear all active Local Find searchbox filters
     *
     * @returns {void}
     */
    clearAutocomplete: () => {},

    /**
     * Delete a specific Local Find searchbox filter (case)
     *
     * @param {string} title
     * @returns {void}
     */
    deleteAutocompleteItem: (title) => {},

    /**
     * Reset a specific facet section (e.g. Program)
     *
     * @param {object} section the configuration object for the section
     * @returns {void}
     */
    resetFacetSection: (section) => {},

    /**
     * Reset a specific facet checkbox (e.g. Program > TAILORx)
     *
     * @param {object} section the configuration object for the section
     * @param {string} checkbox the name of the checkbox
     * @returns {void}
     */
    resetFacetCheckbox: (section, checkbox) => {},

    /**
     * Reset a specific slider section (e.g. Age)
     *
     * @param {object} section the configuration object for the section
     * @returns {void}
     */
    resetFacetSlider: (section) => {},
  },
};