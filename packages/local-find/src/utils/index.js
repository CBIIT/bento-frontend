/**
 * Generates an array of arrays, each of the specified length
 *
 * @param {array} arr the array to split
 * @param {number} length the length of each chunk
 * @returns {array[]} the array of chunks
 */
export const chunkSplit = (arr, length) => {
  // Check if the array is invalid or empty
  if (!arr || !(arr instanceof Array) || !arr.length) {
    return [];
  }

  // Check if the length is invalid
  let chunkLength = length;
  if (!length || typeof length !== 'number' || length < 1) {
    chunkLength = 50;
  }

  // Split the array into chunks
  const result = [];
  for (let i = 0; i < arr.length; i += chunkLength) {
    result.push(arr.slice(i, i + chunkLength));
  }

  return result;
};

export default chunkSplit;
