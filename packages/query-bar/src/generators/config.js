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
     * display copy url button
     * @var {boolean}
     */
    viewQueryURL: true,
    /**
     * display copy url button
     * @var {boolean}
     */
    queryUrlCharacterLimit: 70,
  },

  /* Component Helper Functions */
  functions: {
    /**
     * Clear all active facet/local find filters
     *
     * @returns {void}
     */
    clearAll: () => { },

    /**
     * Clear import from filter
     *
     * @returns {void}
     */
    clearImportFrom: () => { },

    /**
     * Clear all active Local Find file upload filters
     *
     * @returns {void}
     */
    clearUpload: () => { },

    /**
     * Clear all active Local Find searchbox filters
     *
     * @returns {void}
     */
    clearAutocomplete: () => { },

    /**
     * Delete a specific Local Find searchbox filter item.
     * The full autocomplete item is passed (not just the title) so consumers
     * can disambiguate between participant IDs and synonym/associated IDs that
     * may share the same title.
     *
     * @param {object} item the autocomplete item to remove
     * @param {string} item.title the participant identifier
     * @param {string} [item.type] either 'associatedIds' for synonym entries
     *   or any other value (e.g. 'subjectIds', 'participantIds') for
     *   participant IDs
     * @param {string} [item.synonym] the synonym value (associated-IDs only)
     * @returns {void}
     */
    deleteAutocompleteItem: (item) => { },

    /**
     * Reset a specific facet section (e.g. Program)
     *
     * @param {object} section the configuration object for the section
     * @returns {void}
     */
    resetFacetSection: (section) => { },

    /**
     * Reset a specific facet checkbox (e.g. Program > TAILORx)
     *
     * @param {object} section the configuration object for the section
     * @param {string} checkbox the name of the checkbox
     * @returns {void}
     */
    resetFacetCheckbox: (section, checkbox) => { },

    /**
     * Reset a specific slider section (e.g. Age)
     *
     * @param {object} section the configuration object for the section
     * @returns {void}
     */
    resetFacetSlider: (section) => { },
  },
};
