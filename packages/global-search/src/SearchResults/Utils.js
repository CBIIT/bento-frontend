/**
 * Calculates the sum of all values in an object
 *
 * Useful for calculating the total number of search results (e.g. for all tabs)
 *
 * @param {object} obj - the object to sum
 * @returns {number} the sum of all values in the object or 0 if the object is empty
 */
export function countValues(obj) {
  if (!obj || typeof obj !== 'object') {
    return 0;
  }

  const count = Object.values(obj).reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);

  return typeof count === 'number' ? count : 0;
}

export default countValues;
