
const isExploredNode = (key, object) => {
  if(object[key]) {
    return true;
  }
  object[key] = true;
  return false;
}

const initializeFilterByNodes = (node, filterByNode = {}) => {
  const facetSection = 'filterByNode';
  Object.keys(filterByNode).forEach((facet) => {
    const facetItem = node[facet];
    filterByNode[facet][facetItem] = {
      isChecked: false,
      facetSection,
      facet,
      facetItem,
    }
  });
};

const initializeFilterByProperty = (properties, filterByProperty = {}) => {
  const facetSection = 'filterByProperty';
  // console.log(properties);
  Object.keys(filterByProperty).forEach((facet) => {
    const facetItem = properties[facet];
    filterByProperty[facet][facetItem] = {
      isChecked: false,
      facetSection,
      facet,
      facetItem,
    }
  });
};

/**
* 
* @param {*} dictionary 
* return 
*/
export const getFilterItems = (dictionary) => {
  // Filter by node
  const exploredObject = {};
  const filterNodeProperties = [];

  const filterByNode = {
    category: {},
    assignment: {},
    class: {},
  };

  const filterByProperty = {
    propertyType: {},
    display: {},
  };

  // filter items
  const nodes = Object.keys(dictionary);
  const fitlerItems = nodes.reduce((acc, item, index) => {
    const node = dictionary[item];
    acc[item] = false;
    // filter by node 
    if (!isExploredNode(item, exploredObject)) {
      initializeFilterByNodes(node, filterByNode);
    }

    const nodeProperties = Object.keys(node.properties || {});
    if (nodeProperties.length > 0) {
      nodeProperties.forEach((key) => {
        const property = node.properties[key];
        const { display, propertyType } = property;
        if (!isExploredNode(display, exploredObject)
          || !isExploredNode(propertyType, exploredObject)){
          initializeFilterByProperty(property, filterByProperty)
        }
      });
    }

    //filter by property
    return acc;
  }, {});

  return { filterByNode, filterByProperty };
};
