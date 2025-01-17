
// Recursive function to find matches and store key paths
const findMatches = (obj, searchTerm) => {
    let result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && `${value}`.toLowerCase().includes(searchTerm.toLowerCase())) {
        result[key] = value; // Add matching string values
      } else if (typeof value === 'object' && value !== null) {
        const nestedResult = findMatches(value, searchTerm); // Recursive search
        if (Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult; // Add nested results if there are matches
        }
      }
    }
    return result;
};

export const findMatchingText = (searchText, context) => {
  // console.log(searchText);
  const { dictionary } = context;
  // console.log(dictionary);
  const matches = findMatches(dictionary, searchText);
  // console.log('matches');
  // console.log(matches);
  return {
    ...matches,
    searchText
  };
}