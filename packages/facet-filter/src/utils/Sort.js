/* eslint-disable camelcase */
export const sortType = {
  ALPHABET: 'ALPHABET',
  NUMERIC: 'NUMERIC',
  ALPHA_NUMERIC: 'ALPHA_NUMERIC',
  CUSTOM_NUMBER: 'CUSTOM_NUMBER',
  RANGE: 'RANGE',
  NONE: 'NONE',
};

/**
 * Sort checkboxes by Checked
 *
 * @param {array} checkboxData
 * @return {array}
 */

export const sortByCheckedItem = (sortfacetValues) => sortfacetValues
  .sort((a, b) => b.isChecked - a.isChecked);

const startIndex = (range) => Number(`${range}`.split('-')[0]);

const lowerCaseString = (text) => `${text}`.toLowerCase();

/**
 * return numbers array from string
 */
export const getNumberArray = (range) => {
  const numberArray = `${range}`.match(/\d+/g) || [];
  // return inf if there is no number in string
  if (numberArray.length === 0) {
    return [Infinity];
  }
  return numberArray;
};
/**
 * Sort checkboxes by single section
 * @param {array} checkboxData
 * @return {array}
 */
export const sortBySection = ({
  facetValues,
  sort_type,
  sortBy,
  field,
  count = 'subjects',
}) => {
  const sortfacetValues = [...facetValues];
  if (!sortfacetValues || sort_type === sortType.NONE) {
    return facetValues;
  }
  if (sortBy === sortType.NUMERIC) {
    sortfacetValues.sort((a, b) => b[count] - a[count]);
  } else {
    sortfacetValues.sort(((a, b) => (lowerCaseString(a[field]) > lowerCaseString(b[field])
      || -(lowerCaseString(a[field]) < lowerCaseString(b[field])))));
  }

  if (sort_type === sortType.CUSTOM_NUMBER && sortBy !== sortType.NUMERIC) {
    sortfacetValues.sort((a, b) => {
      const aNumbs = getNumberArray(a[field]);
      const bNumbs = getNumberArray(b[field]);
      const aNumb = Number(aNumbs[0]);
      const bNumb = Number(bNumbs[0]);
      return (aNumbs.length === bNumbs.length) ? aNumb > bNumb : -(aNumb <= bNumb);
    });
  }

  if (sort_type === sortType.RANGE && sortBy !== sortType.NUMERIC) {
    sortfacetValues.sort(((a, b) => (startIndex(a[field]) > startIndex(b[field])
      || -(startIndex(a[field]) < startIndex(b[field])))));
  }
  /**
   * Display checked item always on top
   */
  const sortedValues = sortByCheckedItem([...sortfacetValues]);
  return sortedValues;
};
