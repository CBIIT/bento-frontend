/* eslint-disable camelcase */
export const sortType = {
  ALPHABET: 'ALPHABET',
  NUMERIC: 'NUMERIC',
  ALPHA_NUMERIC: 'ALPHA_NUMERIC',
  CUSTOM_NUMBER: 'CUSTOM_NUMBER',
  RANGE: 'RANGE',
};

/**
 * Sort checkboxes by Checked
 *
 * @param {array} checkboxData
 * @return {array}
 */

const sortByCheckedItem = (sortfacetValues) => sortfacetValues
  .sort((a, b) => b.isChecked - a.isChecked);

const startIndex = (range) => Number(`${range}`.split('-')[0]);
/**
 * Sort checkboxes by single section
 *
 * @param {array} checkboxData
 * @return {array}
 */
export const sortBySection = ({ facetValues, sort_type, sortBy }) => {
  const sortfacetValues = [...facetValues];
  if (sortBy === sortType.NUMERIC) {
    sortfacetValues.sort((a, b) => b.subjects - a.subjects);
  } else {
    sortfacetValues.sort(((a, b) => (a.name > b.name || -(a.name < b.name))));
  }

  if (sort_type === sortType.RANGE) {
    sortfacetValues.sort(((a, b) => (startIndex(a.name) > startIndex(b.name)
      || -(startIndex(a.name) < startIndex(b.name)))));
  }
  /**
   * Display checked item always on top
   */
  const sortedValues = sortByCheckedItem([...sortfacetValues]);
  return sortedValues;
};
