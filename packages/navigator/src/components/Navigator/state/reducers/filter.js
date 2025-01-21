import {
  facetSectionType,
  filterByNode,
  filterByProperty,
  level
 } from "../../controller/Filter";
import {
  updateNestedObject,
  updateNestedValue
} from "../../utils/UpdateObject";

const facetType = {
  CATEGORY: 'category',
  ASSIGNMENT: 'assignment'
}

// const inclusiveNodeFacet = {
//   core: 'core',
//   extended: 'extended',
//   primary: 'primary',
//   secondary: 'secondary'
// };

// const inclusivePropertyFacet = {
//   inclusion: 'inclusion',
//   display: 'display',
// }

/**
 * identify the common items node or property
 */
export const getCommonItems = (arrays = []) => {
  if (arrays.length === 0) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }
  const sorted = arrays
    .filter(item => item.length > 0)
    .sort((a, b) => a.length - b.length);
  // const minNodeArray = list.splice(0, 1);
  const commonItems = (sorted || []).reduce((common, array) =>
    {
      return common.filter(item => array.includes(item));
    }
  );

  // item atleast common two facets 
  if (commonItems.length === 0) {
    const combineArrays = sorted.reduce((acc, arry) => {
      acc.push(...arry);
      return acc;
    }, []);
    const elementCount = combineArrays.reduce((count, item) => {
      count[item] = (count[item] || 0) + 1;
      return count;
    }, {});
    // count repeated items
    const repeatedItems = Object.keys(elementCount)
      .filter(item => elementCount[item] > 1);
    return repeatedItems;
  }
  return commonItems;
};

const getActiveFiltersBySection = (filterItems) => {
  const activeFacetItems = Object.keys(filterItems || {})
    .reduce((acc, key) => {
      if (filterItems[key]) {
        const facet = filterItems[key];
        if(facet && !acc[facet]){
          acc[facet] = [];
        }
        acc[facet].push(key);
      }
      return acc;
    }, {});
  return activeFacetItems;
};

const filterData = (data, activeFilters) => {
  if (Object.keys(activeFilters) === 0) {
    return data;
  }
  const filterData = data.filter(row => {
    const facets = Object.keys(activeFilters);
    let match = true;
    facets.forEach(facet => {
      const selectedItems = activeFilters[facet] || [];
      if (!selectedItems.includes(row[facet])) {
        match = false;
      }
    });
    return match;
  });

  return filterData;
};

const getNonCategoryFacetItem = (facetItems) => {
  const items = Object.keys(facetItems || {})
    .reduce((acc, key) => {
      if (key !== facetType.CATEGORY) {
        acc[key] = facetItems[key];
      }
      return acc;
  }, {});
  return items;
};

const getDistinctNode = (data) => {
  const distinctNodes = data.reduce(
    (acc, row) => {
    const { nodeName } = row;
    if (!acc.includes(nodeName)) {
      acc.push(nodeName);
    }
    return acc;
  }, []);
  return distinctNodes;
};

const getNodeCount = (node2FacetItem, facetItemList, nodeList) => {
  const count = facetItemList.reduce((acc, facet) => {
    const nodes = node2FacetItem[facet];
    const filtered = nodes.filter(item => nodeList.includes(item));
    acc[facet] = filtered;
    return acc;
  }, {});
  return count;
};

const getDistinctObjects = (data, key = 'nodeName') => {
  const distinctProperties = data.reduce(
    (acc, row) => {
    const objectValue = row[key];
    if (!acc.includes(objectValue)) {
      acc.push(objectValue);
    }
    return acc;
  }, []);
  return distinctProperties;
};

const getItemCount = (facetItems2Objects, facetItemList, objectList) => {
  const count = facetItemList.reduce((acc, facet) => {
    const items = facetItems2Objects[facet];
    const selectedItems = items.filter(item => objectList.includes(item));
    acc[facet] = selectedItems;
    return acc;
  }, {});
  return count;
}

export const getFacetItemCount2 = (
  isChecked,
  facet,
  currState,
  activeFilters,
  node2FacetItem,
  props2FacetItem
) => {
  const {
    facetItemCount: currFacetItemCount, 
    facet2FacetItem,
    facetFilterData: dataset,
    filterSections
  } = currState;
  const selectedFacetItems = facet2FacetItem[facet] || [];
  let facetFilterData = structuredClone(dataset);
  /**
  * active facet items by sections
  * 
  */
  console.log("************************ FACET ITEM COUNT 2 ************************");
  const activeFiltersByNode = getActiveFiltersBySection(activeFilters?.filterByNode);
  console.log('activeFiltersByNode');
  console.log(activeFiltersByNode);
  const activeFiltersByProperty = getActiveFiltersBySection(activeFilters?.filterByProperty);
  console.log('activeFiltersByProperty');
  console.log(activeFiltersByProperty);

  const allActiveFacetItems = {
    ...activeFiltersByNode,
    ...activeFiltersByProperty
  };
  
  const activeCategoryFilters = activeFiltersByNode.category || [];
  console.log('activeCategoryFilters');
  console.log(activeCategoryFilters);
  const nonActiveCategoryFilters = (facet2FacetItem?.category || [])
    .filter(item => !activeCategoryFilters.includes(item));
  console.log("nonActiveCategoryFilters");
  console.log(nonActiveCategoryFilters);

  const nonCategoryActiveFilters = getNonCategoryFacetItem(allActiveFacetItems);
  console.log('nonCategoryActiveFilters');
  console.log(nonCategoryActiveFilters);

  const nonCategoryActiveFiltersByNode = getNonCategoryFacetItem(activeFiltersByNode);
  console.log('nonCategoryActiveFiltersByNode');
  console.log(nonCategoryActiveFiltersByNode);

  console.log("STEP - 0 - if filter yeilds no results");
  let step0Dataset = filterData(facetFilterData, allActiveFacetItems);
  
  let exclusiveNodes = step0Dataset.map(item => item.nodeName);
  let filteredNodes = Array.from(new Set(exclusiveNodes));
  // console.log(filteredNodes);
  if (step0Dataset.length === 0) {
    if (!isChecked) {
      return {
        facetItemCount: currFacetItemCount,
        filteredNodes: filteredNodes
      };
    }
  }

  console.log('STEP 1. filter by property - dataset 1');
  const step1Dataset = filterData(facetFilterData, activeFiltersByProperty);
  facetFilterData = step1Dataset;

  console.log('STEP 2. filter by NODE - dataset 2');
  console.log("apply category filter to dataset 1");

  let step2Dataset = step1Dataset;
  if (activeCategoryFilters.length > 0) {
    step2Dataset = filterData(step1Dataset, {category: activeCategoryFilters});
  }

  console.log('STEP 3. dataset 1 -(filterDataByCategory)-> dataset 2 - Compute Node count -> Non Category - count1');
  let step3NodeList = getDistinctNode(step2Dataset);
  const step3Facet2Count = [...facet2FacetItem.assignment, ...facet2FacetItem.class]; 
  let step3Count = getNodeCount(node2FacetItem, step3Facet2Count, step3NodeList);
  console.log(step3Count);

  console.log(' STEP 4 - Use non category active facet category node count - use nonCategoryActiveFiltersByNode');
  let step4Dataset = filterData(step1Dataset, nonCategoryActiveFiltersByNode);
  let step4NodeList = getDistinctNode(step4Dataset);
  let step4Count = getNodeCount(node2FacetItem, facet2FacetItem.category, step4NodeList);
  console.log(step4Count);

  console.log(' STEP 5 - count - nodeNonCategoryFacets');
  let step5Dataset = filterData(step2Dataset, nonCategoryActiveFiltersByNode);
  let step5NodeList = getDistinctNode(step5Dataset);
  console.log(step5NodeList);
  let step5Count = getNodeCount(node2FacetItem, step3Facet2Count, step5NodeList);
  console.log(step5Count);

  let step6Dataset = []; 
  let step6Count = {};
  if (facet === facetType.ASSIGNMENT && isChecked) {
    console.log('STEP - 6 - count item base on selected facet item');
    step6Dataset = filterData(step1Dataset,{[facet]: nonCategoryActiveFilters[facet] });
    let step6NodeList = getDistinctNode(step6Dataset);
    let step6Facet2Count = step3Facet2Count.filter(item => !(nonCategoryActiveFilters[facet] || []).includes(item))
    step6Count = getNodeCount(node2FacetItem, step6Facet2Count, step6NodeList);
    console.log(step6Count);
  }

  console.log('STEP - 7 - count property facet item');
  const propertyFacets = [...facet2FacetItem.display, ...facet2FacetItem.inclusion];
  let step7Dataset = filterData(dataset, activeFiltersByNode);
  let step7PropertyList = getDistinctObjects(step7Dataset, 'propertyName');
  let step7Count = getItemCount(props2FacetItem, propertyFacets, step7PropertyList);

  if (Object.keys(activeFiltersByProperty).length > 0) {
    console.log(activeFiltersByProperty);
    Object.keys(activeFiltersByProperty).forEach(facetItem => {
      const item = activeFiltersByProperty[facetItem];
      let step7PropertyDataset = filterData(step7Dataset, {[facetItem]: item});
      let step7FilterPropertyList = getDistinctObjects(step7PropertyDataset, 'propertyName');
      const propFaceItemsCount = Object.keys(filterSections.filterByProperty).reduce(
        (acc, item) => {
          if (item != facetItem) {
            if(!acc.includes(item)) {
              acc.push(...facet2FacetItem[item]);
            }
          }
          return acc;
        }, []);
      // const countItem = facetItem === 'display' ? 'inclusion' : 'display';
      let step7PropertyCount = getItemCount(props2FacetItem, propFaceItemsCount, step7FilterPropertyList);
      console.log(step7PropertyCount);
      step7Count = {
        ...step7Count,
        ...step7PropertyCount
      };
    });
  }

  console.log("STEP n - SELECTED FACET");
  const prevFacetItemCount = {};
  selectedFacetItems.forEach(facetItem => {
    if (currFacetItemCount[facetItem]) {
      prevFacetItemCount[facetItem] = currFacetItemCount[facetItem];
    } else {
      prevFacetItemCount[facetItem] = [];
    }
  });
  console.log(prevFacetItemCount);

  const facetItemCount = {
    ...step3Count,
    ...step4Count,
    ...step5Count,
    ...step6Count,
    ...step7Count,
    ...prevFacetItemCount
  }
  console.log("************************ FACET ITEM COUNT 2 ************************");
  
  return {
    facetItemCount, filteredNodes
  };
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
};

export const onToggleFacetFilter = (
  currState,
  filterItem
) => {
  const { 
    facetSection,
    facet,
    facetItem,
    isChecked
  } = filterItem;

  const currSelectedFacet = {
    [facetSection]: {
      [facet]: {
        [facetItem]: {
          isChecked: isChecked,
        }
      }
    }
  };

  const selectedFacetItem = {
    filterSections: {
      ...currSelectedFacet
    }
  };

  // set active filters
  const {
    activeFilters = {},
    filterSections,
    facetItemCount: currFacetItemCount,
    dictionary,
    node2FacetItem,
    props2FacetItem,
    facetFilterData
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

  const { 
    filteredNodes,
    facetItemCount
  } = getFacetItemCount2(
    isChecked,
    facet,
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem
  );
  
  const filterDictionary = Object.keys(dictionary).reduce(
    (acc, item) => {
      if (filteredNodes && filteredNodes.includes(item)) {
        acc[item] = dictionary[item];
      }
      return acc;
    }, {});

  return {
    ...updatedObject,
    activeFilters,
    facetItemCount,
    filterDictionary
  };
};

export const getInitState = (state) => {
  const cloneState = structuredClone(state);
  const { 
    dictionary, 
    filterSections,
    node2FacetItem, 
    props2FacetItem,
  } = cloneState;

  /**
   * init count
   */
  const { 
    facetItemCount
  } = getFacetItemCount2(
    false,
    null,
    cloneState,
    [],
    node2FacetItem,
    props2FacetItem
  );

  /**
  * uncheck all filters
  * reset active filters
  */
  updateNestedValue(filterSections, false, 'isChecked');

  return {
    ...cloneState,
    activeFilters: {},
    filterDictionary: dictionary,
    facetItemCount,
    filterSections
  };
};
