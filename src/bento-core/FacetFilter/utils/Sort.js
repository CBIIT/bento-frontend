/* eslint-disable camelcase */
export const sortType = {
  ALPHABET: 'ALPHABET',
  NUMERIC: 'NUMERIC',
  ALPHA_NUMERIC: 'ALPHA_NUMERIC',
  CUSTOM_NUMBER: 'CUSTOM_NUMBER',
};

/**
 * Sort checkboxes by Checked
 *
 * @param {array} checkboxData
 * @return {array}
 */

const sortByCheckedItem = (sortfacetValues) => sortfacetValues
  .sort((a, b) => b.isChecked - a.isChecked);

/**
 * Sort checkboxes by single section
 *
 * @param {array} checkboxData
 * @return {array}
 */
export const sortBySection = ({ facetValues, sortBy }) => {
  const sortfacetValues = [...facetValues];
  if (sortBy === sortType.NUMERIC) {
    sortfacetValues.sort((a, b) => b.subjects - a.subjects);
  } else {
    sortfacetValues.sort(((a, b) => (a.name > b.name || -(a.name < b.name))));
  }
  /**
   * Display checked item always on top
   */
  const sortedValues = sortByCheckedItem([...sortfacetValues]);
  return sortedValues;
};