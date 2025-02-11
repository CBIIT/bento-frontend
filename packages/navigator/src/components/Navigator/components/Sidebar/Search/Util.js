
// Recursive function to find matches and store key paths
const findMatches = (obj, searchTerm) => {
    let result = {};
    let summary = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key !== 'links') {
        if (typeof value === 'string' && `${value}`.toLowerCase().includes(searchTerm.toLowerCase())) {
          result[key] = value; // Add matching string values
          if (!summary[key]) {
            summary[key] = 0;
          }
          summary[key] += 1;
        } else if (typeof value === 'object' && value !== null) {
          const { result: nestedResult, summary: nestedSummary} = findMatches(value, searchTerm); // Recursive search
          if (Object.keys(nestedResult).length > 0) {
            result[key] = nestedResult; // Add nested results if there are matches
            summary[key] = nestedSummary;
          }
        }
      }
    }
  
    return { result , summary};
};

const formatSummary = (searchText, summary) => {
  const summaryCount = Object.keys(summary || {})
    .reduce((acc, key, index) => {
        const item = summary[key];
        if (index < 1) {
          acc = {title: 0, desc:0, properties: 0};
        }
        acc.text = searchText;
        if (item) {
          acc.title += item.id ? item.id : 0;
          acc.desc += item.desc ? item.desc : 0;
          acc.properties += Object.keys(item.properties || {}).length;
          acc.totalCount = acc.title + acc.desc + acc.properties;
        }
        return acc;
    }, {});
  return summaryCount;
}

export const findMatchingText = (searchText, context) => {
  const { dictionary } = context;
  const { result: matches, summary: summaryResult }= findMatches(dictionary, searchText);
  const summary = formatSummary(searchText, summaryResult);
  return {
    matches: {
      ...matches,
      searchText
    },
    summary,
  };
}