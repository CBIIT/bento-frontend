import {
  facetSectionType,
  filterByNode,
  filterByProperty,
  level
 } from "../../../controller/Filter";
import { updateNestedObject } from "../../../utils/UpdateObject";
import { getFacetItemCount } from "./FacetItemCount";

const selectFacetItemCounts = (
  currFacetItemsCount,
  exclusiveCount,
  inclusiveCount
) => {
  console.log('selectFacetItemCounts');
  console.log(currFacetItemsCount);
  console.log(exclusiveCount);
  console.log(inclusiveCount);

}

export const initFacetItemCount = (
  facetFilterData
) => {
  const facetItemCount = {};
  facetFilterData.forEach((item, index) => {
    filterByNode.forEach((facet) => {
      if (!facetItemCount[item[facet]]) {
        facetItemCount[item[facet]] = [];
      }
      if (!facetItemCount[item[facet]].includes(item.nodeName)) {
        facetItemCount[item[facet]].push(item.nodeName);
      }
    });
    filterByProperty.forEach((facet) => {
      if (!facetItemCount[item[facet]]) {
        facetItemCount[item[facet]] = [];
      }
      if (!facetItemCount[item[facet]].includes(item.propertyName)) {
        facetItemCount[item[facet]].push(item.propertyName);
      }
    });
  });
  return facetItemCount;
}

// const getFacetItemCounts = (
//   currFacetItemsCount,
//   activeFilters,
//   facetFilterData
// ) => {
//   let filterDataset = structuredClone(facetFilterData);

//   // reset the filter
//   const activeFacetSections = Object.keys(activeFilters).map((section) => {
//     if (Object.keys(activeFilters[section]).length > 0) {
//       return section;
//     }
//     return undefined;
//   }).filter(item => item);

//   if (activeFacetSections.length === 0) {
//     return initFacetItemCount(filterDataset);
//   }

//   // Step 1
//   // exclusion filter count 
//   // active filterByNode should define proptery count
//   // const nodes = new Set();
//   // const exclusiveResultSet = [];
//   // const activeNodeFilter = activeFilters[facetSectionType.filterByNode] || {};
//   // if (Object.keys(activeNodeFilter || {}).length > 0) {
//   //   filterDataset.forEach(item => {
//   //     let isMatched = true;
//   //     for (let [facetItem, facet] of Object.entries(activeNodeFilter)) {
//   //       if (item[facet] !== facetItem) {
//   //         isMatched = false;
//   //         break;
//   //       }
//   //     }
//   //     if(isMatched) {
//   //       nodes.add(item.nodeName);
//   //       exclusiveResultSet.push(item);
//   //     }
//   //   });
//   // }

//   // generateNodeInclusion(
//   //   nodeList,
//   //   activeNodeFilter,
//   //   filterDataset,
//   // );

//   // const exclusiveCount = {};
//   // exclusiveResultSet.forEach((item, index) => {
//   //   filterByNode.forEach((facet) => {
//   //     if (!exclusiveCount[item[facet]]) {
//   //       exclusiveCount[item[facet]] = [];
//   //     }
//   //     if (!exclusiveCount[item[facet]].includes(item.nodeName)) {
//   //       exclusiveCount[item[facet]].push(item.nodeName);
//   //     }
//   //   });
//   //   filterByProperty.forEach((facet) => {
//   //     if (!exclusiveCount[item[facet]]) {
//   //       exclusiveCount[item[facet]] = [];
//   //     }
//   //     if (!exclusiveCount[item[facet]].includes(item.propertyName)) {
//   //       exclusiveCount[item[facet]].push(item.propertyName);
//   //     }
//   //   });
//   // });

//   const { nodeList, filterByNodeCount  } = getFilterByNodeCount(activeFilters, filterDataset);

//   // Step 2
//   // inclusion count
//   // FilterByNode facetIem count should be determine by FilterByProperty
//   const activePropertyFilter = activeFilters[facetSectionType.filterByProperty] || {};
  
//   const inclusiveResultSet = [];
//   if (Object.keys(activePropertyFilter || {}).length > 0) {
//     filterDataset.forEach((item, index) => {
//       let isMatched = true;
//       for (let [facetItem, facet] of Object.entries(activePropertyFilter)) {
//         if (item[facet] !== facetItem) {
//           isMatched = false;
//           break;
//         }
//       }
//       if (isMatched) {
//         if (nodeList.length > 0) {
//           if (nodeList.includes(item.nodeName)) {
//             inclusiveResultSet.push(item);
//           }
//         } else {
//           inclusiveResultSet.push(item);
//         }
//       }
//     });
//   };

//   const inclusiveCount = {};
//   inclusiveResultSet.forEach((item, index) => {
//     filterByNode.forEach((facet) => {
//       if (!inclusiveCount[item[facet]]) {
//         inclusiveCount[item[facet]] = [];
//       }
//       if (!inclusiveCount[item[facet]].includes(item.nodeName)) {
//         inclusiveCount[item[facet]].push(item.nodeName);
//       }
//     });
//     filterByProperty.forEach((facet) => {
//       if (!inclusiveCount[item[facet]]) {
//         inclusiveCount[item[facet]] = [];
//       }
//       if (!inclusiveCount[item[facet]].includes(item.propertyName)) {
//         inclusiveCount[item[facet]].push(item.propertyName);
//       }
//     });
//   });

//   console.log(currFacetItemsCount);

//   if (Object.keys(filterByNodeCount).length === 0
//     && Object.keys(inclusiveCount).length > 0) {
//     return { ...inclusiveCount, ...currFacetItemsCount };
//   }

//   if (Object.keys(inclusiveCount).length === 0
//     &&  Object.keys(filterByNodeCount).length > 0) {
//     return { ...filterByNodeCount, ...currFacetItemsCount };
//   }

//   selectFacetItemCounts(currFacetItemsCount, exclusiveCount, inclusiveCount);
// };

export const onFilterValueChange = (
  currState,
  filterItem
) => {
  const { 
    facetSection,
    facet,
    facetItem,
    isChecked
  } = filterItem;

  const selectedFacetItem = {
    filterSections: {
      [facetSection]: {
        [facet]: {
          [facetItem]: {
            isChecked: isChecked,
          }
        }
      }
    }
  };

  // set active filters
  const {
    activeFilters = {},
    facetFilterData,
    filterSections,
    facetItemCount: currFICount,

    node2FacetItem,
    props2FacetItem
  } = currState;

  if (isChecked) {
    if (!activeFilters[facetSection]) {
      activeFilters[facetSection] = {};
    }
    activeFilters[facetSection][facetItem] = facet;
  } else {
    delete activeFilters[facetSection][facetItem];
  }
  
  // update active state
  const updatedObject = updateNestedObject(currState, selectedFacetItem);

  const currFacetItemsCount = Object.keys(filterSections[facetSection][facet])
  .reduce((acc, item) => {
    if (currFICount) {
      acc[item] = currFICount[item];
    }
    return acc;
  }, {});

  // attempt 2
  getFacetItemCount(
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem
  );

  // const facetItemCount = getFacetItemCounts(
  //   currFacetItemsCount,
  //   activeFilters, 
  //   facetFilterData
  // );

  return {
    ...updatedObject,
    activeFilters,
  };
}
