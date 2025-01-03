import {
 facetSectionType,
 filterByNode,
 filterByProperty,
 level
} from "../../../controller/Filter";

const inclusiveNodeFacet = {
  core: 'core',
  extended: 'extended',
  primary: 'primary',
  secondary: 'secondary'
}

/**
* property facet count based on node filter
*/
export const getExclusionCount = (
  activeNodeFilter,
  filterDataset
) => {

  // Step 1
  // exclusion filter count 
  // active filterByNode should define proptery count
  const nodes = new Set();
  const exclusiveResultSet = [];
  // const activeNodeFilter = activeFilters[facetSectionType.filterByNode] || {};
  if (Object.keys(activeNodeFilter || {}).length > 0) {
    filterDataset.forEach(item => {
      let isMatched = true;
      for (let [facetItem, facet] of Object.entries(activeNodeFilter)) {
        if (item[facet] !== facetItem) {
          isMatched = false;
          break;
        }
      }
      if(isMatched) {
        nodes.add(item.nodeName);
        exclusiveResultSet.push(item);
      }
    });
  }

  const nodeList = Array.from(nodes);

  const exclusiveCount = {};
  exclusiveResultSet.forEach((item, index) => {
    filterByNode.forEach((facet) => {
      if (!exclusiveCount[item[facet]]) {
        exclusiveCount[item[facet]] = [];
      }
      if (!exclusiveCount[item[facet]].includes(item.nodeName)) {
        exclusiveCount[item[facet]].push(item.nodeName);
      }
    });
    filterByProperty.forEach((facet) => {
      if (!exclusiveCount[item[facet]]) {
        exclusiveCount[item[facet]] = [];
      }
      if (!exclusiveCount[item[facet]].includes(item.propertyName)) {
        exclusiveCount[item[facet]].push(item.propertyName);
      }
    });
  });

  return { nodeList, exclusiveCount };
}

// const generate
export const getInclusionCount = (
    activeNodeFilter,
    filterDataset,
) => {
  const nodeSpecificInclusion = [];
  console.log("Calculate inclusion");
  console.log(activeNodeFilter);
  if (Object.keys(activeNodeFilter || {}).length > 0) {
    filterDataset.forEach(item => {
      if (item.level === level.NODE) {
        let isMatched = false;
        for (let [facetItem, facet] of Object.entries(activeNodeFilter)) {
          if (item[facet] === facetItem) {
            isMatched = true;
            break;
          }
        }
        if(isMatched) {
          nodeSpecificInclusion.push(item);
        }
      }
    });
  }
  console.log(nodeSpecificInclusion);

  const nodeInclusionCount = {};
  nodeSpecificInclusion.forEach((item, index) => {
    filterByNode.forEach((facet) => {
      if (!nodeInclusionCount[item[facet]]) {
        nodeInclusionCount[item[facet]] = [];
      }
      if (!nodeInclusionCount[item[facet]].includes(item.nodeName)) {
        nodeInclusionCount[item[facet]].push(item.nodeName);
      }
    });
  });

  console.log(nodeInclusionCount);
  return nodeInclusionCount;
};

export  const getFilterByNodeCount = (
  activeFilters,
  filterDataset
) => {
  console.log(activeFilters);
  console.log(filterDataset);
  const activeNodeFilter = activeFilters[facetSectionType.filterByNode] || {};
  const { nodeList, exclusiveCount } = getExclusionCount(activeNodeFilter, filterDataset);
  const inclusionCount = getInclusionCount(activeNodeFilter, filterDataset);
  console.log(exclusiveCount);
  console.log(inclusionCount);
  // const filterByNodeCount = Object.keys({ ...exclusiveCount,
  //   ...inclusionCount}).map((key) => {
  //   if(exclusiveCount[key]?.length < inclusionCount[key]?.length) {
  //     return exclusiveCount[key];
  //   }
  // });
  const applyInclusion = Object.keys(activeNodeFilter)
    .filter(key => activeNodeFilter[key] === 'category');
  console.log(applyInclusion);
  if (applyInclusion.length === 0) {
    Object.keys(inclusiveNodeFacet).forEach(key => {
      exclusiveCount[key] = exclusiveCount[key] < inclusionCount[key]
        ? exclusiveCount[key] : inclusionCount[key];
    });
  }
  const filterByNodeCount = {
    ...exclusiveCount
  }
  return {
    nodeList,
    filterByNodeCount
  }
}