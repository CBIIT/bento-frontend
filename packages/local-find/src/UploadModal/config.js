/* eslint-disable no-unused-vars */
/**
 * Default configuration for Local Find Upload Modal
 */
export const DEFAULT_CONFIG_UPLOADMODAL = {
  // Misc. Configuration Options
  config: {
    title: 'Upload Case Set',
    inputPlaceholder: 'eg. BENTO-CASE-06, BENTO-CASE-22',
    inputTooltip: 'Add the case indentifier.',
    uploadTooltip: 'Add the case indentifier.',
    accept: '.csv,.txt',
    maxSearchTerms: 1000,
    matchedId: 'subject_id',
    matchedLabel: 'SUBMITTED CASE ID',
    associateId: 'program_id',
    associataLabel: 'ASSOCIATED PROGRAM',
    projectName: 'BENTO',
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

export default DEFAULT_CONFIG_UPLOADMODAL;
